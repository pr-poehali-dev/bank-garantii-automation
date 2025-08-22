import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Icon from '@/components/ui/icon'

interface GuaranteeOptionsProps {
  onSelectGuarantee: () => void
}

const GuaranteeOptions = ({ onSelectGuarantee }: GuaranteeOptionsProps) => {
  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
          <span>Выберите из списка сумму гарантии</span>
        </CardTitle>
        <CardDescription>
          Четыре типа банковских гарантий на выбор. Просто нажмите «Выбрать» на подходящем варианте.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Commercial Guarantee */}
          <div className="group cursor-pointer" onClick={onSelectGuarantee}>
            <div className="relative p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Icon name="Building2" className="mx-auto mb-6 text-blue-600" size={48} />
              <h3 className="font-bold text-lg mb-4 text-slate-900 text-center">Коммерческая банковская гарантия</h3>
              <div className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-slate-600 text-white rounded-xl text-center font-medium hover:shadow-lg transition-shadow">
                Выбрать
              </div>
            </div>
          </div>

          {/* Express Guarantee 1-5M */}
          <div className="group cursor-pointer" onClick={onSelectGuarantee}>
            <div className="relative p-8 bg-gradient-to-br from-white to-amber-50 rounded-2xl border border-amber-100 hover:border-amber-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="absolute top-4 right-4 w-3 h-3 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Icon name="Zap" className="mx-auto mb-6 text-amber-600" size={48} />
              <h3 className="font-bold text-lg mb-4 text-slate-900 text-center">Экспресс гарантия от 1000 рублей до 5 миллионов</h3>
              <div className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl text-center font-medium hover:shadow-lg transition-shadow">
                Выбрать
              </div>
            </div>
          </div>

          {/* Guarantee 10-100M */}
          <div className="group cursor-pointer" onClick={onSelectGuarantee}>
            <div className="relative p-8 bg-gradient-to-br from-white to-emerald-50 rounded-2xl border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Icon name="TrendingUp" className="mx-auto mb-6 text-emerald-600" size={48} />
              <h3 className="font-bold text-lg mb-4 text-slate-900 text-center">Банковская гарантия от 10 до 100 миллионов</h3>
              <div className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-center font-medium hover:shadow-lg transition-shadow">
                Выбрать
              </div>
            </div>
          </div>

          {/* Guarantee 100M+ */}
          <div className="group cursor-pointer" onClick={onSelectGuarantee}>
            <div className="relative p-8 bg-gradient-to-br from-white to-purple-50 rounded-2xl border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="absolute top-4 right-4 w-3 h-3 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Icon name="Crown" className="mx-auto mb-6 text-purple-600" size={48} />
              <h3 className="font-bold text-lg mb-4 text-slate-900 text-center">Банковская гарантия от 100 миллионов и выше</h3>
              <div className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-center font-medium hover:shadow-lg transition-shadow">
                Выбрать
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default GuaranteeOptions