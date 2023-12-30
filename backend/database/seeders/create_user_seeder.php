<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class create_user_seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // $user = [
        //     ['name' => 'admin', 'email' => 'admin@phtv.com', 'password' => bcrypt('admin@'), 'role' => 'QuanTri']
        // ];

        // User::insert($user);
        $now = Carbon::now()->toDateTimeString();
        $users = [
            ['name' => 'admin','email' => 'admin@phtv.com','password' => bcrypt('admin@'),'role' => 'Super', 'avatar'=>null, 'created_at'=>$now, 'updated_at'=>$now],
            ['name' => 'mod','email' => 'mod@phtv.com','password' => bcrypt('mod@'),'role' => 'QuanTri', 'avatar'=>null, 'created_at'=>$now, 'updated_at'=>$now],
            ['name' => 'free','email' => 'free@phtv.com','password' => bcrypt('free@'),'role' => 'KhachHang', 'avatar'=>null, 'created_at'=>$now, 'updated_at'=>$now],
        ];
        User::insert($users);
    }
}
