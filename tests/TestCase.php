<?php

namespace Tests;

use Database\Seeders\ReferenceDataSeeder;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    /**
     * Roles and status lookup rows are referenced by foreign keys across the
     * schema, so they are seeded as part of the database refresh rather than
     * being rebuilt by each individual test case.
     */
    protected $seeder = ReferenceDataSeeder::class;
}
