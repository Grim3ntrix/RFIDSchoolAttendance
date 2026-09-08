@php($overviewRoute = auth()->user()->hasRole('superadmin') ? 'superadmin_overview' : (auth()->user()->hasRole('teacher') ? 'teacher_overview' : 'student_overview'))
@php($roleName = ucfirst(auth()->user()->getRoleNames()->first()))

<nav class="sticky top-0 z-30 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
    <div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        <!-- Left: mobile sidebar toggle + brand (sidebar is visible on >= sm) -->
        <div class="flex items-center gap-3">
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button"
                class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden">
                <span class="sr-only">Open sidebar</span>
                <x-icon name="menu" class="h-6 w-6" />
            </button>
            <a href="{{ route($overviewRoute) }}" class="flex items-center gap-2.5 sm:hidden">
                <img src="{{ asset('images/mnhs.png') }}" class="h-7 w-7" alt="MNHS Logo" />
                <span class="text-base font-semibold whitespace-nowrap text-gray-900 dark:text-white">MNHS Attendance</span>
            </a>
        </div>

        <!-- Right: theme toggle + user menu -->
        <div class="flex items-center gap-1 sm:gap-2">

            <!-- Dark mode toggle -->
            <button id="theme-toggle-btn" type="button"
                class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Toggle dark mode</span>
                <!-- Moon: shown in light mode -->
                <x-icon name="moon" class="hidden h-5 w-5 dark:block" />
                <!-- Sun: shown in dark mode -->
                <x-icon name="sun" class="h-5 w-5 dark:hidden" />
            </button>

            <!-- Avatar dropdown -->
            <button id="avatarButton" type="button"
                class="flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-transparent transition hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:hover:ring-gray-600 dark:focus:ring-gray-600 {{ Auth::user()->avatar_color }}"
                aria-expanded="false"
                data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom-start"
                title="{{ Auth::user()->name }}">
                <span class="select-none text-sm font-semibold leading-none text-white" aria-hidden="true">{{ Auth::user()->initials }}</span>
            </button>

            <div id="userDropdown" class="z-20 hidden w-56 divide-y divide-gray-100 rounded-xl bg-white shadow-lg dark:divide-gray-600 dark:bg-gray-700">
                <div class="px-4 py-3">
                    <p class="truncate text-sm font-semibold text-gray-900 dark:text-white">{{ Auth::user()->name }}</p>
                    <p class="truncate text-xs text-gray-500 dark:text-gray-400">{{ Auth::user()->email }}</p>
                    <span class="mt-2 inline-flex items-center rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-600/10 dark:text-primary-400">{{ $roleName }}</span>
                </div>
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                    <li>
                        <a href="{{ route('profile.edit') }}" class="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            <x-icon name="settings" class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            Settings
                        </a>
                    </li>
                </ul>
                <div class="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="flex w-full items-center gap-2.5 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            <x-icon name="log-out" class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            Logout
                        </button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</nav>
