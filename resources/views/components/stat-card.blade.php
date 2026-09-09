@props(['label', 'valueId', 'icon', 'accent' => 'primary'])
@php
    /* Restrained accents per the design guide — a tinted icon square on a
       neutral card, never a fully colored tile. */
    $accents = [
        'primary' => 'bg-primary-50 text-primary-700 dark:bg-primary-600/10 dark:text-primary-400',
        'blue'    => 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
        'amber'   => 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
        'red'     => 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
        'gray'    => 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    ];
    $accentClass = $accents[$accent] ?? $accents['primary'];
@endphp
<div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <div class="flex items-center gap-4">
        <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg {{ $accentClass }}">
            <x-icon :name="$icon" class="h-5 w-5" />
        </div>
        <div class="min-w-0">
            <p class="truncate text-sm font-medium text-gray-500 dark:text-gray-400">{{ $label }}</p>
            <p id="{{ $valueId }}" class="text-2xl font-bold text-gray-900 dark:text-white">-</p>
        </div>
    </div>
    {{ $slot }}
</div>
