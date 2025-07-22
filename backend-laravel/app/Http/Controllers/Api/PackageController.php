<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\PackageFeature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PackageController extends Controller
{
    public function index()
    {
        return Package::with('features')->get();
    }

    public function show($id)
    {
        return Package::with('features')->findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'description' => 'nullable|string|max:200',
            'price' => 'required|numeric|min:0',
            'features' => 'array',
            'features.*.label' => 'required|string|max:80',
            'features.*.included' => 'boolean'
        ]);

        $package = Package::create($validated);

        foreach ($request->features ?? [] as $feature) {
            $package->features()->create([
                'label' => $feature['label'],
                'included' => $feature['included']
            ]);
        }

        return $package->load('features');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'description' => 'nullable|string|max:200',
            'price' => 'required|numeric|min:0',
            'features' => 'array',
            'features.*.id' => 'nullable|integer|exists:package_features,id',
            'features.*.label' => 'required|string|max:80',
            'features.*.included' => 'boolean'
        ]);

        return DB::transaction(function () use ($validated, $request, $id) {
            $package = Package::findOrFail($id);
            $package->update($validated);

            $existingIds = $package->features()->pluck('id')->toArray();
            $receivedIds = collect($request->features)->pluck('id')->filter()->toArray();
            $toDelete = array_diff($existingIds, $receivedIds);

            PackageFeature::destroy($toDelete);

            foreach ($request->features as $feature) {
                if (!empty($feature['id'])) {
                    $existing = PackageFeature::find($feature['id']);
                    if ($existing) {
                        $existing->update([
                            'label' => $feature['label'],
                            'included' => $feature['included']
                        ]);
                    }
                } else {
                    $package->features()->create([
                        'label' => $feature['label'],
                        'included' => $feature['included']
                    ]);
                }
            }

            return $package->load('features');
        });
    }

    public function destroy($id)
    {
        return Package::destroy($id);
    }
}
