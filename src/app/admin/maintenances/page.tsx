"use client";

import React, { useState } from "react";
import { useCollection } from "@/hooks/useFirestore";
import { Plus, Pencil, Trash2, CheckCircle, Clock, AlertTriangle, Wrench } from "lucide-react";

export default function MaintenancesPage() {
  const { data: maintenances, loading, add, update, remove } = useCollection("maintenances");
  const { data: residences } = useCollection("residences");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    residenceId: "",
    description: "",
    urgence: "normale",
    status: "pending",
    date: new Date(),
  });

  const getResidenceName = (residenceId: string) => {
    const residence = residences?.find((r: any) => r.id === residenceId);
    return residence?.name || "N/A";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await update(editingId, formData);
    } else {
      await add({ ...formData, createdAt: new Date() });
    }
    setShowModal(false);
    setEditingId(null);
    setFormData({
      residenceId: "",
      description: "",
      urgence: "normale",
      status: "pending",
      date: new Date(),
    });
  };

  const getUrgenceColor = (urgence: string) => {
    switch (urgence) {
      case "urgente":
        return "bg-red-100 text-red-700";
      case "normale":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in_progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Terminé";
      case "in_progress":
        return "En cours";
      default:
        return "En attente";
    }
  };

  const getUrgenceText = (urgence: string) => {
    switch (urgence) {
      case "urgente":
        return "Urgente";
      case "normale":
        return "Normale";
      default:
        return "Basse";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Maintenances</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gestion des demandes de maintenance et réparations
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              residenceId: "",
              description: "",
              urgence: "normale",
              status: "pending",
              date: new Date(),
            });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} />
          Nouvelle demande
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">En attente</p>
          <p className="text-2xl font-bold text-yellow-600">
            {maintenances?.filter((m: any) => m.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">En cours</p>
          <p className="text-2xl font-bold text-blue-600">
            {maintenances?.filter((m: any) => m.status === "in_progress").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Terminées</p>
          <p className="text-2xl font-bold text-green-600">
            {maintenances?.filter((m: any) => m.status === "completed").length}
          </p>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-500 text-sm">
              <th className="px-6 py-4 font-medium">Résidence</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Urgence</th>
              <th className="px-6 py-4 font-medium">Statut</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {maintenances?.map((maintenance: any) => (
              <tr key={maintenance.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {getResidenceName(maintenance.residenceId)}
                </td>
                <td className="px-6 py-4 text-gray-600 max-w-md truncate">
                  {maintenance.description}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgenceColor(
                      maintenance.urgence
                    )}`}
                  >
                    {getUrgenceText(maintenance.urgence)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={maintenance.status}
                    onChange={async (e) => {
                      await update(maintenance.id, { status: e.target.value });
                    }}
                    className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(
                      maintenance.status
                    )}`}
                    aria-label="Changer le statut"
                  >
                    <option value="pending">En attente</option>
                    <option value="in_progress">En cours</option>
                    <option value="completed">Terminé</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(maintenance.id);
                        setFormData({
                          residenceId: maintenance.residenceId,
                          description: maintenance.description,
                          urgence: maintenance.urgence,
                          status: maintenance.status,
                          date: maintenance.date,
                        });
                        setShowModal(true);
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="Modifier"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Supprimer cette demande ?")) {
                          remove(maintenance.id);
                        }
                      }}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Modifier" : "Ajouter"} une demande
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="residence" className="block text-sm font-medium text-gray-700 mb-1">
                  Résidence
                </label>
                <select
                  id="residence"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={formData.residenceId}
                  onChange={(e) =>
                    setFormData({ ...formData, residenceId: e.target.value })
                  }
                  aria-label="Sélectionner une résidence"
                >
                  <option value="">Sélectionner une résidence</option>
                  {residences?.map((res: any) => (
                    <option key={res.id} value={res.id}>
                      {res.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Décrivez le problème..."
                />
              </div>
              <div>
                <label htmlFor="urgence" className="block text-sm font-medium text-gray-700 mb-1">
                  Niveau d'urgence
                </label>
                <select
                  id="urgence"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={formData.urgence}
                  onChange={(e) =>
                    setFormData({ ...formData, urgence: e.target.value })
                  }
                  aria-label="Niveau d'urgence"
                >
                  <option value="basse">Basse</option>
                  <option value="normale">Normale</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  {editingId ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}