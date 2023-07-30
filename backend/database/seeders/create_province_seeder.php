<?php

namespace Database\Seeders;

use App\Models\Province;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class create_province_seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    
    public function run(): void
    {
        
        $now = Carbon::now()->toDateTimeString();
        $provinces = [
            ['tenTinh' => 'TP. Hồ Chí Minh', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'TP. Hà Nội', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Đà Nẵng', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'An Giang', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Bà Rịa-Vũng Tàu', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Bạc Liêu', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Bắc Giang', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Bắc Kạn', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Bắc Ninh', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Bến Tre', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Bình Dương', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Bình Định', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Bình Phước', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Bình Thuận', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Cà Mau', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Cao Bằng', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Cần Thơ', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Đà Nẵng', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Đắk Nông', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Điện Biên', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Đồng Nai', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Đồng Tháp', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Gia Lai', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Hà Giang', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Hà Nam', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Hà Tĩnh', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Hải Dương', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Hải Phòng', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Hậu Giang', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Hòa Bình', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Hưng Yên', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Khánh Hòa', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Kiên Giang', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Kon Tum', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Lai Châu', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Lạng Sơn', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Lào Cai', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Lâm Đồng', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Long An', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Nam Định', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Nghệ An', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Ninh Bình', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Ninh Thuận', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Phú Thọ', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Phú Yên', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Quảng Bình', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Quảng Bình', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Quảng Ngãi', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Quảng Ninh', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Quảng Trị', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Sóc Trăng', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Sơn La', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Tây Ninh', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Thái Bình', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Thái Nguyên', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Thanh Hóa', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Thừa Thiên Huế', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Tiền Giang', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Trà Vinh', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Tuyên Quang', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Vĩnh Long', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Vĩnh Phúc', 'created_at'=>$now, 'updated_at'=>$now],
            ['tenTinh' => 'Yên Bái', 'created_at'=>$now, 'updated_at'=>$now],
        ];
        Province::insert($provinces);
        
    }
}
