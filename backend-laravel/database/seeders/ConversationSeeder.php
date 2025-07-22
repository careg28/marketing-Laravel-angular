<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Conversation;

class ConversationSeeder extends Seeder
{
    public function run()
    {
        Conversation::create([
            'user_id' => 1, // Asegúrate de que este user_id exista
            'subject' => 'Consulta sobre mi proyecto',
        ]);
        Conversation::create([
            'user_id' => 2,
            'subject' => 'Problema con el acceso',
        ]);
    }
}
