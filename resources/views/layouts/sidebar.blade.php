@php
    /* Role navigation, data-driven so every section gets identical styling.
       'active' is a routeIs() pattern; 'badge' renders the pending-count
       element polled by the excuse-count JS (element id must not change). */
    $menu = [];

    if (auth()->user()->hasRole('superadmin')) {
        $menu = [
            [
                'label' => 'Main Menu',
                'items' => [
                    ['route' => 'superadmin_overview', 'active' => 'superadmin_overview', 'icon' => 'layout-dashboard', 'text' => 'Overview'],
                    ['route' => 'pre-registered-teachers.index', 'active' => 'pre-registered-teachers.*', 'icon' => 'user-plus', 'text' => 'Pre-Register'],
                ],
            ],
            [
                'label' => 'Geofence',
                'items' => [
                    ['route' => 'geofence-boundaries.index', 'active' => 'geofence-boundaries.*', 'icon' => 'map-pin', 'text' => 'Boundary'],
                ],
            ],
        ];
    } elseif (auth()->user()->hasRole('teacher')) {
        $menu = [
            [
                'label' => 'Main Menu',
                'items' => [
                    ['route' => 'teacher_overview', 'active' => 'teacher_overview', 'icon' => 'layout-dashboard', 'text' => 'Overview'],
                    ['route' => 'rfid-attendances.index', 'active' => 'rfid-attendances.*', 'icon' => 'scan-line', 'text' => 'Attendance', 'pill' => 'RFID'],
                    ['route' => 'reports.index', 'active' => 'reports.*', 'icon' => 'file-text', 'text' => 'Report'],
                ],
            ],
            [
                'label' => 'Management',
                'items' => [
                    ['route' => 'sections.index', 'active' => 'sections.*', 'icon' => 'school', 'text' => 'Section'],
                ],
            ],
            [
                'label' => 'Review Request',
                'items' => [
                    ['route' => 'teacher.excuses.index', 'active' => 'teacher.excuses.*', 'icon' => 'message-square', 'text' => 'Excuse', 'badge' => 'teacher-excuse-request-pending-count'],
                ],
            ],
            [
                'label' => 'Geofence',
                'items' => [
                    ['route' => 'student_locations.index', 'active' => 'student_locations.*', 'icon' => 'map-pin', 'text' => 'Location'],
                ],
            ],
        ];
    } elseif (auth()->user()->hasRole('student')) {
        $menu = [
            [
                'label' => 'Main Menu',
                'items' => [
                    ['route' => 'student_overview', 'active' => 'student_overview', 'icon' => 'layout-dashboard', 'text' => 'Overview'],
                ],
            ],
            [
                'label' => 'Excuse Request',
                'items' => [
                    ['route' => 'student.excuses.index', 'active' => 'student.excuses.*', 'icon' => 'message-square', 'text' => 'Excuse', 'badge' => 'student-excuse-request-pending-count'],
                ],
            ],
        ];
    }
@endphp

<aside id="logo-sidebar" aria-label="Sidebar"
    class="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0">
    <div class="flex h-full flex-col overflow-y-auto px-3 pb-4">

        <!-- Brand -->
        <div class="flex items-center justify-between gap-1 px-2 py-5">
            <a href="{{ url('/') }}" class="flex min-w-0 flex-1 items-center gap-3">
                <img src="{{ asset('images/mnhs.png') }}" class="h-8 w-8 shrink-0" alt="MNHS Logo" />
                <span class="truncate text-base font-semibold text-gray-900 dark:text-white">MNHS Attendance</span>
            </a>
            <button type="button" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
                class="inline-flex shrink-0 items-center rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden">
                <span class="sr-only">Close sidebar</span>
                <x-icon name="x" class="h-5 w-5" />
            </button>
        </div>

        <nav class="flex-1 space-y-6">
            @foreach ($menu as $section)
                <div>
                    <h3 class="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">{{ $section['label'] }}</h3>
                    <ul class="space-y-1 font-medium">
                        @foreach ($section['items'] as $item)
                            @php($isActive = request()->routeIs($item['active']))
                            <li>
                                <a href="{{ route($item['route']) }}"
                                    class="group flex items-center rounded-lg p-2 text-sm {{ $isActive
                                        ? 'bg-primary-50 font-semibold text-primary-700 dark:bg-primary-600/10 dark:text-primary-400'
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white' }}"
                                    aria-current="{{ $isActive ? 'page' : 'false' }}">
                                    <x-icon :name="$item['icon']"
                                        class="h-5 w-5 flex-shrink-0 {{ $isActive
                                            ? 'text-primary-600 dark:text-primary-400'
                                            : 'text-gray-400 transition group-hover:text-gray-700 dark:text-gray-500 dark:group-hover:text-white' }}" />
                                    <span class="ms-3 flex-1 whitespace-nowrap">{{ __($item['text']) }}</span>

                                    @if (isset($item['pill']))
                                        <span class="ms-3 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ $item['pill'] }}</span>
                                    @endif

                                    @if (isset($item['badge']))
                                        <span id="{{ $item['badge'] }}"
                                            class="hidden ms-3 inline-flex items-center justify-center rounded-full border border-white bg-red-500 px-2 py-1 text-xs font-bold leading-none text-white">0</span>
                                    @endif
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </div>
            @endforeach
        </nav>

    </div>
</aside>

<!-- Drawer backdrop (mobile) -->
<div data-drawer-backdrop="logo-sidebar" aria-hidden="true" class="fixed inset-0 z-30 hidden bg-gray-900/50 dark:bg-gray-900/60"></div>
