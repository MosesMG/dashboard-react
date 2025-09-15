import { CalendarDays, ChartArea, File, ListCheck, QrCode, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const SCAN_RESULTS_KEY = 'scanResults';

const getScanResults = (): { code: string, timestamp: string }[] => {
   try {
      const results = localStorage.getItem(SCAN_RESULTS_KEY);
      return results ? JSON.parse(results) : [];
   } catch {
      return [];
   }
};

const clearScanResults = (): void => {
   try {
      localStorage.removeItem(SCAN_RESULTS_KEY);
   } catch (error) {
      console.error('Erreur lors de la suppression:', error);
   }
};

const InfosScan = () => {
   const [results, setResults] = useState<{ code: string, timestamp: string }[]>([]);

   const [detailedResults, setDetailedResults] = useState<
      { code: string; timestamp: string }[]
   >([]);

   useEffect(() => {
      const loadResults = () => {
         const savedResults = getScanResults();
         setResults(savedResults);
      }

      loadResults();

      const handleStorageChange = () => {
         loadResults();
      };
      window.addEventListener('storage', handleStorageChange);

      const interval = setInterval(loadResults, 1000);

      return () => {
         window.removeEventListener('storage', handleStorageChange);
         clearInterval(interval);
      }
   }, []);

   useEffect(() => {
      const detailed = results.map((item, index) => ({
         code: item.code,
         timestamp: new Date(item.timestamp).toLocaleString("fr-FR"),
         id: Date.now() - index,
      }));
      setDetailedResults(detailed);
   }, [results]);

   const handleClearHistory = () => {
      clearScanResults();
      setResults([]);
   }

   return (

      <section className="max-w-6xl mx-auto my-12">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
               <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                     <ChartArea className="mr-2" />
                     <span>Statistiques</span>
                  </h3>
                  <div className="space-y-4">
                     <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg p-3 text-center">
                        <div className="text-3xl font-bold">{results.length}</div>
                        <div className="text-sm opacity-90">Total des scans</div>
                     </div>

                     <div className="bg-teal-600 text-white rounded-lg p-3 text-center">
                        <div className="text-3xl font-bold">
                           {detailedResults.filter(scan => {
                              const today = new Date().toLocaleDateString("fr-FR");
                              const scanDate = new Date(results.find(r => r.code === scan.code)?.timestamp || '').toLocaleDateString("fr-FR");
                              return scanDate === today;
                           }).length}
                        </div>
                        <div className="text-sm opacity-90">Aujourd'hui</div>
                     </div>

                     <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg p-3 text-center">
                        <div className="text-3xl font-bold">
                           {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        <div className="text-sm opacity-90">Heure actuelle</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-2">
               <div className="bg-white rounded-lg shadow-lg h-full">
                  <div className="p-6 border-b border-gray-200">
                     <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                           <ListCheck className="mr-2" />
                           <span>Historique complet ({results.length})</span>
                        </h2>
                        {results.length > 0 && (
                           <button
                              onClick={handleClearHistory}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center space-x-2"
                           >
                              <Trash2 />
                              <span>Vider l'historique</span>
                           </button>
                        )}
                     </div>
                  </div>

                  <div className="p-6">
                     {detailedResults.length === 0 ? (
                        <div className="text-center py-12">
                           <div className="text-6xl text-gray-700 mb-4 flex justify-center">
                              <QrCode size={50} />
                           </div>
                           <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun scan effectué</h3>
                           <p className="text-gray-500">Utilisez le scanner pour commencer à enregistrer des codes</p>
                        </div>
                     ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                           {detailedResults.map((result, index) => (
                              <div
                                 key={result.code}
                                 className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 border border-gray-200 transition-all duration-200 hover:shadow-md"
                              >
                                 <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                       <div className="flex items-center space-x-2 mb-2">
                                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                                             #{detailedResults.length - index}
                                          </span>
                                       </div>
                                       <div className="font-mono text-gray-800 break-all mb-2 bg-white rounded-lg p-3 border">
                                          {result.code}
                                       </div>
                                       <div className="text-xs text-gray-500 flex items-center space-x-4">
                                          <span className="flex items-center space-x-1">
                                             <CalendarDays />
                                             <span>{result.timestamp}</span>
                                          </span>
                                       </div>
                                    </div>
                                    <div className="flex flex-col space-y-2 ml-4">
                                       <button
                                          onClick={() => navigator.clipboard?.writeText(result.code)}
                                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center space-x-1"
                                          title="Copier le code"
                                       >
                                          <File />
                                          <span>Copier</span>
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default InfosScan;
