<button {{ $attributes->merge(['type' => 'submit', 'class' => 'inline-flex items-center px-5 py-2.5 bg-red-600 border border-transparent rounded-lg font-medium text-sm text-white hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 transition ease-in-out duration-150']) }}>
    {{ $slot }}
</button>
