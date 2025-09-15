import React, { useRef, useState } from "react";
import type { IBreadcrumbItem } from "../../types/ui";
import PageTitle from "../../components/ui/PageTitle";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { Camera, Check, File, X } from "lucide-react";
import QrBarcodeScanner from "react-qr-barcode-scanner";

interface IScanner {
   onSuccess?: (code: string) => void;
}

const Scanner: React.FC<IScanner> = ({ onSuccess }) => {
   const breadcrumbItems: IBreadcrumbItem[] = [
      { name: "Accueil", link: "/accueil" },
      { name: "Analyses", link: "/analyses" },
      { name: "Scanner", link: "" }
   ];

   const [results, setResults] = useState<string[]>([]);
   const [scanning, setScanning] = useState<boolean>(false);
   const [data, setData] = useState<string>("");
   const bipRef = useRef<HTMLAudioElement | null>(null);

   const handleDetect = (code: string) => {
      setData(code);
      setScanning(false);

      if ("vibrate" in navigator) {
         navigator.vibrate(200);
      }

      bipRef.current?.play();

      if (onSuccess) {
         setResults(prev => [code, ...prev]);
      }
   };

   const handleCancel = () => {
      setScanning(false);
      setData("");
   };

   return (
      <>
         <PageTitle title="Scanner le code" />
         <Breadcrumb items={breadcrumbItems} />

         <section>
            <div className="lg:px-24">
               <h1 className="text-2xl font-bold text-gray-900">Scanner QR/Barres Code</h1>
               <p className="text-gray-500 mt-1">Pointez votre caméra vers le code à scanner</p>
            </div>

            <audio ref={bipRef} preload="auto" />

            {!scanning && !data && (
               <>
                  <div className="text-center my-8">
                     <button
                        onClick={() => setScanning(true)}
                        className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white
                        font-semibold py-4 px-8 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102"
                     >
                        <div className="flex items-center justify-center space-x-2">
                           <Camera className="w-5 h-5" />
                           <p>Appuyez pour commencer</p>
                        </div>
                     </button>
                  </div>

                  <div className="mt-10 bg-blue-50 rounded-2xl p-6 max-w-md mx-auto">
                     <h2 className="text-lg font-semibold text-blue-800 mb-4">
                        Instructions d'utilisation
                     </h2>
                     <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700">
                        <li>Cliquez sur "Appuyer pour commencer"</li>
                        <li>Autorisez l'accès à la caméra</li>
                        <li>Pointez vers un QR code ou code-barres</li>
                        <li>Attendez la détection automatique</li>
                     </ol>
                  </div>
               </>
            )}

            {scanning && (
               <div className="bg-white rounded-xl shadow-xl p-6 my-8">
                  <div className="relative max-w-lg mx-auto">
                     <QrBarcodeScanner
                        onUpdate={(err: unknown, result: { text: string } | null) => {
                           if (result) {
                              handleDetect(result.text);
                           }
                        }}
                        constraints={{ facingMode: "environment" }}
                     />

                     <button
                        onClick={handleCancel}
                        className="absolute top-3 right-3 px-4 py-2 bg-red-600/50 hover:bg-red-700/60 text-white rounded-md shadow-md transition-colors flex items-center space-x-1"
                     >
                        <X className="w-4 h-4" />
                        <span className="text-xs font-semibold">Annuler</span>
                     </button>
                  </div>

                  <div className="mt-6 text-center">
                     <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-5 py-2.5 rounded-full shadow-sm">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-semibold text-sm">Scan en cours...</span>
                     </div>
                     <p className="text-gray-500 text-sm mt-3">
                        Pointez votre caméra vers le QR code ou code-barres
                     </p>
                  </div>
               </div>
            )}

            {data && (
               <div className="bg-white rounded-xl shadow-xl p-8 my-8 max-w-xl mx-auto">
                  <div className="text-center">
                     <div className="flex justify-center mb-6">
                        <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-md">
                           <Check className="text-white w-8 h-8" strokeWidth={4} />
                        </div>
                     </div>
                        
                     <h2 className="text-xl font-semibold text-green-900 mb-4">Code détecté avec succès !</h2>
                     <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 mb-6">
                        <p className="text-gray-600 mb-2">Code détecté:</p>
                        <code className="text-xl font-mono text-gray-800 break-all block bg-white rounded-lg p-4 border-2 border-violet-200">
                           {data}
                        </code>
                     </div>
                     <div className="flex gap-5 justify-center">
                        <button
                           onClick={() => navigator.clipboard?.writeText(data)}
                           className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl"
                        >
                           <File className="w-4 h-4" />
                           <span className="text-sm">Copier le code</span>
                        </button>
                        <button
                           onClick={() => {
                              setData("");
                              setScanning(true);
                           }}
                           className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl"
                        >
                           <span className="text-xl"><i className="fa fa-camera"></i></span>
                           <Camera className="w-4 h-4" />
                           <span className="text-sm">Nouveau scan</span>
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </section>
      </>
   );
}

export default Scanner;
