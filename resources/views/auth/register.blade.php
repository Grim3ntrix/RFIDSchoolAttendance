<x-auth-layout>
    <div class="mb-6">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Create teacher account</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Your Teacher ID must be pre-registered by the school admin.</p>
    </div>

    <form method="POST" action="{{ route('register') }}" class="space-y-5">
        @csrf

        <div>
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" autofocus autocomplete="name" placeholder="Full Name" />
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Teacher ID -->
            <div>
                <x-input-label for="teacher_id" :value="__('Teacher ID')" />
                <x-text-input id="teacher_id" class="block mt-1 w-full" type="text" name="teacher_id" :value="old('teacher_id')" autocomplete="teacher_id" placeholder="Teacher ID" />
                <x-input-error :messages="$errors->get('teacher_id')" class="mt-2" />
            </div>

            <!-- Email Address -->
            <div>
                <x-input-label for="email" :value="__('Email')" />
                <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" autocomplete="username" placeholder="Email" />
                <x-input-error :messages="$errors->get('email')" class="mt-2" />
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Password -->
            <div>
                <x-input-label for="password" :value="__('Password')" />
                <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" autocomplete="new-password" placeholder="Password" />
                <x-input-error :messages="$errors->get('password')" class="mt-2" />
            </div>

            <!-- Confirm Password -->
            <div>
                <x-input-label for="password_confirmation" :value="__('Confirm Password')" />
                <x-text-input id="password_confirmation" class="block mt-1 w-full" type="password" name="password_confirmation" autocomplete="new-password" placeholder="Confirm Password" />
                <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
            </div>
        </div>

        <x-primary-button class="w-full justify-center">
            {{ __('Register') }}
        </x-primary-button>

        <p class="text-sm text-center text-gray-500 dark:text-gray-400">
            {{ __('Already have an account?') }}
            <a href="{{ route('login') }}" class="font-medium text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">{{ __('Log in') }}</a>
        </p>
    </form>
</x-auth-layout>
