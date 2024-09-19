<x-auth-layout>
    <form method="POST" action="{{ route('register') }}">
        @csrf

        <div class="grid grid-cols-1">

            <!-- Name -->
            <div>
                <x-input-label for="name" :value="__('Name')" />
                <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" autofocus autocomplete="name" placeholder="Full Name"/>
                <x-input-error :messages="$errors->get('name')" class="mt-2" />
            </div>

        </div>
        <div class="grid grid-cols-2 gap-4">

            <!-- Teacher ID -->
            <div class="mt-4">
                <x-input-label for="teacher_id" :value="__('Teacher ID')" />
                <x-text-input id="teacher_id" class="block mt-1 w-full" type="text" name="teacher_id" :value="old('teacher_id')" autofocus autocomplete="teacher_id" placeholder="Teacher ID"/>
                <x-input-error :messages="$errors->get('teacher_id')" class="mt-2" />
            </div>

            <!-- Email Address -->
            <div class="mt-4">
                <x-input-label for="email" :value="__('Email')" />
                <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" autocomplete="username" placeholder="Email"/>
                <x-input-error :messages="$errors->get('email')" class="mt-2" />
            </div>
            
        </div>
        <div class="grid grid-cols-2 gap-4">

            <!-- Password -->
            <div class="mt-4">
                <x-input-label for="password" :value="__('Password')" />

                <x-text-input id="password" class="block mt-1 w-full"
                                type="password"
                                name="password"
                             autocomplete="new-password" placeholder="Password"/>

                <x-input-error :messages="$errors->get('password')" class="mt-2" />
            </div>

           <!-- Confirm Password -->
           <div class="mt-4">
                <x-input-label for="password_confirmation" :value="__('Confirm Password')" />

                <x-text-input id="password_confirmation" class="block mt-1 w-full"
                                type="password"
                                name="password_confirmation" autocomplete="new-password" placeholder="Confirm Password"/>

                <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
            </div>
            
        </div>


        <div class="flex items-center justify-end mt-6">
            <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" href="{{ route('login') }}">
                {{ __('Have an account? Login') }}
            </a>

            <x-primary-button class="ms-4">
                {{ __('Register') }}
            </x-primary-button>
        </div>
    </form>
</x-auth-layout>
