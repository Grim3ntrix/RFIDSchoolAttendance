<x-auth-layout>
    <div class="mb-6">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Forgot your password?</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ __('Enter your email address and we will send you a password reset link.') }}
        </p>
    </div>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('password.email') }}" class="space-y-5">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" placeholder="Email" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <x-primary-button class="w-full justify-center">
            {{ __('Email Password Reset Link') }}
        </x-primary-button>

        <p class="text-sm text-center text-gray-500 dark:text-gray-400">
            {{ __('Remembered it?') }}
            <a href="{{ route('login') }}" class="font-medium text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">{{ __('Back to login') }}</a>
        </p>
    </form>
</x-auth-layout>
