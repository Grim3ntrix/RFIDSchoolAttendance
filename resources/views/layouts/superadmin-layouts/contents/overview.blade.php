<x-app-layout>
    <x-page-header title="Overview" description="Monitor pre-registered and registered teachers across the school." />

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <x-stat-card label="Total Pre-Registered" valueId="total-pre-registered" icon="user-plus" />
        <x-stat-card label="Total Registered" valueId="total-registered" icon="users" />
        <x-stat-card label="Total Teachers" valueId="total-teachers" icon="school" accent="blue" />
    </div>
</x-app-layout>
