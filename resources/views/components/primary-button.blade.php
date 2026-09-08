<button {{ $attributes->merge(['type' => 'submit', 'class' => 'inline-flex items-center px-5 py-2.5 bg-primary-700 dark:bg-primary-600 border border-transparent rounded-lg font-medium text-sm text-white hover:bg-primary-800 dark:hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 active:bg-primary-900 dark:active:bg-primary-800 transition ease-in-out duration-150']) }}>
    {{ $slot }}
</button>
