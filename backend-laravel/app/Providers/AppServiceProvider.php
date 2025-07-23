<?php

namespace App\Providers;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void
{
    VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
        return (new MailMessage)
            ->subject('Confirma tu correo electrónico')
            ->greeting('¡Hola!')
            ->line('Gracias por registrarte. Haz clic en el botón para verificar tu correo.')
            ->action('Verificar ahora', $url)
            ->line('Si no creaste esta cuenta, puedes ignorar este mensaje.');
    });
}

}
