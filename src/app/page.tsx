export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Bem-vindo ao Tche Satsuma
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sistema de Gerenciamento de Membros e Eventos
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Sobre o Sistema
            </h2>
            <p className="text-gray-600 text-left mb-4">
              Este sistema foi desenvolvido para facilitar a gestão de membros e
              eventos anuais da organização Tche Satsuma - Kagoshima RS, uma
              comunidade de descendentes japoneses da Prefeitura de Kagoshima no
              Rio Grande do Sul.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              Funcionalidades Principais
            </h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Gerenciamento de membros e cadastros</li>
              <li>• Planejamento e organização de eventos anuais</li>
              <li>• Sistema de inscrições e controle de presenças</li>
              <li>• Comunicação multi-canal (WhatsApp, Email, Correio)</li>
              <li>• Gestão financeira e controle de doações</li>
              <li>• Relatórios financeiros e de participação</li>
              <li>• Coordenação de voluntários</li>
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Membros
              </h3>
              <p className="text-blue-700 text-sm">
                Gerencie cadastros e mantenha contato com a comunidade
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Eventos
              </h3>
              <p className="text-green-700 text-sm">
                Organize almoços anuais e outras atividades da comunidade
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Relatórios
              </h3>
              <p className="text-purple-700 text-sm">
                Acompanhe finanças e participação em tempo real
              </p>
            </div>
          </div>
          <div className="mt-12">
            <p className="text-gray-500 text-sm">
              Para começar, acesse o painel administrativo ou consulte a
              documentação de desenvolvimento.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
