<x-auth-layout>
    <div class="mb-6">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Verify your email</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ __('Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.') }}
        </p>
    </div>

    @if (session('status') == 'verification-link-sent')
        <div class="mb-5 flex items-start gap-3 rounded-lg border border-primary-100 bg-primary-50 p-4 text-sm font-medium text-primary-700 dark:border-primary-700/40 dark:bg-primary-600/10 dark:text-primary-400" role="status">
            <x-icon name="check" class="mt-0.5 h-4 w-4 shrink-0" />
            <span>{{ __('A new verification link has been sent to the email address you provided during registration.') }}</span>
        </div>
    @endif

    <form method="POST" action="{{ route('verification.send') }}" class="mb-4">
        @csrf

        <x-primary-button class="w-full justify-center">
            {{ __('Resend Verification Email') }}
        </x-primary-button>
    </form>

    <form method="POST" action="{{ route('logout') }}" class="text-center">
        @csrf

        <button type="submit" class="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600">
            {{ __('Log Out') }}
        </button>
    </form>
</x-auth-layout>
