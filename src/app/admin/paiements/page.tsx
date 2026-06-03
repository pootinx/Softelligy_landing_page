"use client";

import React, { useState } from "react";
import { useCollection } from "@/hooks/useFirestore";
import { Plus, Pencil, Trash2, DollarSign, Eye } from "lucide-react";

export default function PaiementsPage() {
  const { data: paiements, loading, add, update, remove } = useCollection("paiements");
  const { data: locataires } = useCollection("locataires");
  const { data: residences } = useCollection("residences");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    locataireId: "",
    montant: 0,
    mois: "",
    annee: new Date().getFullYear(),
    status: "pending",
    datePaiement: null,
  });

  const getLocataireName = (locataireId: string) => {
    const locataire = locataires?.find((l: any) => l.id === locataireId);
    return locataire?.name || "N/A";
  };

  const getResidenceName = (locataireId: string) => {
    const locataire = locataires?.find((l: any) => l.id === locataireId);
    const residence = residences?.find((r: any) => r.id === locataire?.residenceId);
    return residence?.name || "N/A";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      montant: Number(formData.montant),
      createdAt: new Date(),
    };
    if (editingId) {
      await update(editingId, dataToSave);
    } else {
      await add(dataToSave);
    }
    setShowModal(false);
    setEditingId(null);
    setFormData({
      locataireId: "",
      montant: 0,
      mois: "",
      annee: new Date().getFullYear(),
      status: "pending",
      datePaiement: null,
    });
  };

  const handleMarquerPaye = async (id: string) => {
    await update(id, {
      status: "paid",
      datePaiement: new Date(),
    });
  };

  const moisOptions = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

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
          <h1 className="text-2xl font-bold text-gray-800">Paiements</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gestion des loyers et paiements
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              locataireId: "",
              montant: 0,
              mois: "",
              annee: new Date().getFullYear(),
              status: "pending",
              datePaiement: null,
            });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} />
          Nouveau paiement
        </button>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total encaissé</p>
          <p className="text-2xl font-bold text-gray-800">
            {paiements?.filter((p: any) => p.status === "paid").reduce((sum: number, p: any) => sum + (p.montant || 0), 0).toLocaleString()} DH
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">En attente</p>
          <p className="text-2xl font-bold text-yellow-600">
            {paiements?.filter((p: any) => p.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Ce mois-ci</p>
          <p className="text-2xl font-bold text-green-600">
            {paiements?.filter((p: any) => {
              if (p.status !== "paid") return false;
              const date = p.datePaiement?.toDate?.() || new Date(p.datePaiement);
              return date.getMonth() === new Date().getMonth();
            }).reduce((sum: number, p: any) => sum + (p.montant || 0), 0).toLocaleString()} DH
          </p>
        </div>
      </div>

      {/* Tableau des paiements */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-500 text-sm">
              <th className="px-6 py-4 font-medium">Locataire</th>
              <th className="px-6 py-4 font-medium">Résidence</th>
              <th className="px-6 py-4 font-medium">Mois</th>
              <th className="px-6 py-4 font-medium">Montant</th>
              <th className="px-6 py-4 font-medium">Statut</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paiements?.map((paiement: any) => (
              <tr key={paiement.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {getLocataireName(paiement.locataireId)}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {getResidenceName(paiement.locataireId)}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {paiement.mois} {paiement.annee}
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {paiement.montant?.toLocaleString()} DH
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      paiement.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {paiement.status === "paid" ? "Payé" : "En attente"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {paiement.status !== "paid" && (
                      <button
                        onClick={() => handleMarquerPaye(paiement.id)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                        title="Marquer comme payé"
                      >
                        <Eye size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setEditingId(paiement.id);
                        setFormData({
                          locataireId: paiement.locataireId,
                          montant: paiement.montant,
                          mois: paiement.mois,
                          annee: paiement.annee,
                          status: paiement.status,
                          datePaiement: paiement.datePaiement,
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
                        if (confirm("Supprimer ce paiement ?")) {
                          remove(paiement.id);
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

      {/* Modal d'ajout/modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Modifier" : "Ajouter"} un paiement
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="locataire" className="block text-sm font-medium text-gray-700 mb-1">
                  Locataire
                </label>
                <select
                  id="locataire"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={formData.locataireId}
                  onChange={(e) =>
                    setFormData({ ...formData, locataireId: e.target.value })
                  }
                  aria-label="Sélectionner un locataire"
                >
                  <option value="">Sélectionner un locataire</option>
                  {locataires?.map((loc: any) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} - {getResidenceName(loc.id)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="montant" className="block text-sm font-medium text-gray-700 mb-1">
                  Montant (DH)
                </label>
                <input
                  id="montant"
                  type="number"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={formData.montant}
                  onChange={(e) =>
                    setFormData({ ...formData, montant: parseInt(e.target.value) })
                  }
                  placeholder="Ex: 3500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="mois" className="block text-sm font-medium text-gray-700 mb-1">
                    Mois
                  </label>
                  <select
                    id="mois"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={formData.mois}
                    onChange={(e) =>
                      setFormData({ ...formData, mois: e.target.value })
                    }
                    aria-label="Sélectionner un mois"
                  >
                    <option value="">Choisir</option>
                    {moisOptions.map((mois) => (
                      <option key={mois} value={mois}>
                        {mois}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="annee" className="block text-sm font-medium text-gray-700 mb-1">
                    Année
                  </label>
                  <input
                    id="annee"
                    type="number"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={formData.annee}
                    onChange={(e) =>
                      setFormData({ ...formData, annee: parseInt(e.target.value) })
                    }
                    placeholder="2025"
                  />
                </div>
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