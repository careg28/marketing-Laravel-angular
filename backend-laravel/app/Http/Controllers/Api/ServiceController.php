<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    // Lista todos los servicios
    public function index()
    {
        return response()->json(Service::all(), 200);
    }

    // Crea un nuevo servicio
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $service = Service::create($validated);

        return response()->json($service, 201);
    }

    // Muestra un servicio específico
    public function show($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Servicio no encontrado'], 404);
        }

        return response()->json($service, 200);
    }

    // Actualiza un servicio existente
    public function update(Request $request, $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Servicio no encontrado'], 404);
        }

        $validated = $request->validate([
            'project_id' => 'sometimes|required|exists:projects,id',
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $service->update($validated);

        return response()->json($service, 200);
    }

    // Elimina un servicio
    public function destroy($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Servicio no encontrado'], 404);
        }

        $service->delete();

        return response()->json(['message' => 'Servicio eliminado'], 200);
    }
}