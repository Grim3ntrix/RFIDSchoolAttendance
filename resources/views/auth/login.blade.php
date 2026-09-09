<x-auth-layout>
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <div class="mb-6">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Log in to your account</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Welcome back — enter your credentials to continue.</p>
    </div>

    <form method="POST" action="{{ route('login') }}" class="space-y-5">
        @csrf

        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" autofocus autocomplete="username" placeholder="Email" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div>
            <div class="flex items-center justify-between">
                <x-input-label for="password" :value="__('Password')" />
                @if (Route::has('password.request'))
                    <a href="{{ route('password.request') }}" class="text-sm font-medium text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
                        {{ __('Forgot your password?') }}
                    </a>
                @endif
            </div>
            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" autocomplete="current-password" placeholder="Password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <label for="remember_me" class="inline-flex items-center cursor-pointer">
            <input id="remember_me" type="checkbox" class="w-4 h-4 rounded border-gray-300 bg-gray-50 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800" name="remember">
            <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">{{ __('Remember me') }}</span>
        </label>

        <x-primary-button class="w-full justify-center">
            {{ __('Log in') }}
        </x-primary-button>

        <p class="text-sm text-center text-gray-500 dark:text-gray-400">
            {{ __('New User?') }}
            <a href="{{ route('register') }}" class="font-medium text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">{{ __('Create an account') }}</a>
        </p>
    </form>
</x-auth-layout>
