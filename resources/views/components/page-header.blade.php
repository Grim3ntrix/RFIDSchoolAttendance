@props(['title', 'description' => null])
<div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div class="min-w-0">
        <h1 class="text-2xl font-semibold leading-tight text-gray-900 dark:text-white">{{ $title }}</h1>
        @if ($description)
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ $description }}</p>
        @endif
    </div>
    @isset($actions)
        <div class="flex flex-shrink-0 items-center gap-3">
            {{ $actions }}
        </div>
    @endisset
</div>
