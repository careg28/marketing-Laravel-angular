<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContactMessage;

class ContactMessageSeeder extends Seeder
{
    public function run()
    {
        // Mensaje de usuario en la conversacion 1
        ContactMessage::create([
            'conversation_id' => 1,
            'user_id' => 1,
            'message' => 'Hola, necesito información sobre mi proyecto.',
            'is_admin' => false,
        ]);
        // Respuesta del admin en la misma conversacion
        ContactMessage::create([
            'conversation_id' => 1,
            'user_id' => null, // o el ID del admin si tienes usuarios admin
            'message' => '¡Claro! ¿En qué podemos ayudarte?',
            'is_admin' => true,
        ]);
    }
}
