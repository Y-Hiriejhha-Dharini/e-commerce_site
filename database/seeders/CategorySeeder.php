<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert(
            [
                [
                    'name' => 'Customized',
                    'slug' => 'customized',
                    'status' => '0'
                ],
                [
                    'name' => 'Showrooms',
                    'slug' => 'showrooms',
                    'status' => '0'
                ],
                [
                    'name' => 'Final Products',
                    'slug' => 'final_products',
                    'status' => '0'
                ]
            ]
        );
    }
}
