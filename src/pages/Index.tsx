import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Icon from '@/components/ui/icon'

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' }))
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [guaranteeAmount, setGuaranteeAmount] = useState('')
  const [dragActive, setDragActive] = useState(false)

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileName = e.dataTransfer.files[0].name
      setUploadedFiles(prev => [...prev, fileName])
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name
      setUploadedFiles(prev => [...prev, fileName])
    }
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-primary shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Icon name="Building2" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">БАНКОВСКИЕ ГАРАНТИИ.РУ</h1>
            </div>
            <div className="flex items-center space-x-2 text-lg font-medium text-gray-700">
              <Icon name="Clock" size={20} />
              <span id="current-time">{currentTime}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900">Автоматизированная система выпуска банковских гарантий</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Мы официальные партнеры многих банков России! Сайт создан в целях автоматизации выпуска банковской гарантии, 
            чтобы уйти от телефонных переговоров и сразу же приступить к оформлению банковской гарантии.
          </p>
        </div>

        {/* Step-by-step Process */}
        <div className="space-y-8">
          {/* Step 1: Choose Guarantee Amount */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
                <span>Шаг. Выберите из списка сумму гарантии</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Commercial Guarantee */}
                <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary">
                  <CardContent className="p-6 text-center">
                    <Icon name="Building2" className="mx-auto mb-4 text-primary" size={48} />
                    <h3 className="font-semibold mb-2">Коммерческая банковская гарантия</h3>
                    <Button variant="outline" className="w-full">
                      Выбрать
                    </Button>
                  </CardContent>
                </Card>

                {/* Express Guarantee 1-5M */}
                <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary">
                  <CardContent className="p-6 text-center">
                    <Icon name="Zap" className="mx-auto mb-4 text-secondary" size={48} />
                    <h3 className="font-semibold mb-2">Экспресс гарантия от 1 до 5 миллионов</h3>
                    <Button variant="outline" className="w-full">
                      Выбрать
                    </Button>
                  </CardContent>
                </Card>

                {/* Guarantee 10-100M */}
                <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary">
                  <CardContent className="p-6 text-center">
                    <Icon name="TrendingUp" className="mx-auto mb-4 text-primary" size={48} />
                    <h3 className="font-semibold mb-2">Банковская гарантия от 10 до 100 миллионов</h3>
                    <Button variant="outline" className="w-full">
                      Выбрать
                    </Button>
                  </CardContent>
                </Card>

                {/* Guarantee 100M+ */}
                <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary">
                  <CardContent className="p-6 text-center">
                    <Icon name="Crown" className="mx-auto mb-4 text-secondary" size={48} />
                    <h3 className="font-semibold mb-2">Банковская гарантия от 100 миллионов и выше</h3>
                    <Button variant="outline" className="w-full">
                      Выбрать
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Document Upload */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
                <span>Шаг. Нажмите скрепку, подгрузите документы</span>
              </CardTitle>
              <CardDescription>Перечень документов указан ниже</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Commercial Guarantee Documents */}
                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Icon name="Building2" className="text-primary" size={20} />
                      <span>Коммерческая банковская гарантия</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                        dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Icon name="Paperclip" size={32} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-sm mb-2">Загрузить документы</p>
                      <input
                        type="file"
                        id="commercial-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        multiple
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('commercial-upload')?.click()}
                      >
                        <Icon name="Paperclip" className="mr-2" size={16} />
                        Выбрать файлы
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Express Guarantee Documents */}
                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Icon name="Zap" className="text-secondary" size={20} />
                      <span>Экспресс гарантия от 1 до 5 миллионов</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                        dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Icon name="Paperclip" size={32} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-sm mb-2">Загрузить документы</p>
                      <input
                        type="file"
                        id="express-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        multiple
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('express-upload')?.click()}
                      >
                        <Icon name="Paperclip" className="mr-2" size={16} />
                        Выбрать файлы
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Medium Guarantee Documents */}
                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Icon name="TrendingUp" className="text-primary" size={20} />
                      <span>Банковская гарантия от 10 до 100 миллионов</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                        dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Icon name="Paperclip" size={32} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-sm mb-2">Загрузить документы</p>
                      <input
                        type="file"
                        id="medium-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        multiple
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('medium-upload')?.click()}
                      >
                        <Icon name="Paperclip" className="mr-2" size={16} />
                        Выбрать файлы
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Large Guarantee Documents */}
                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Icon name="Crown" className="text-secondary" size={20} />
                      <span>Банковская гарантия от 100 миллионов и выше</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                        dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Icon name="Paperclip" size={32} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-sm mb-2">Загрузить документы</p>
                      <input
                        type="file"
                        id="large-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        multiple
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('large-upload')?.click()}
                      >
                        <Icon name="Paperclip" className="mr-2" size={16} />
                        Выбрать файлы
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h4 className="font-medium">Загруженные файлы:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                      <Icon name="FileCheck" className="text-green-600" size={16} />
                      <span className="text-sm">{file}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 3: Details */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</div>
                <span>Шаг. Укажите ФЗ, точную сумму, срок и ссылку на тендер</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fz">Федеральный закон</Label>
                  <Input id="fz" placeholder="ФЗ-44, ФЗ-223" />
                </div>
                <div>
                  <Label htmlFor="exact-amount">Точная сумма</Label>
                  <Input id="exact-amount" placeholder="15 000 000 ₽" />
                </div>
                <div>
                  <Label htmlFor="term">Срок действия</Label>
                  <Input id="term" placeholder="12 месяцев" />
                </div>
                <div>
                  <Label htmlFor="tender-link">Ссылка на тендер</Label>
                  <Input id="tender-link" placeholder="https://zakupki.gov.ru/..." />
                </div>
              </div>
              <Button className="w-full" size="lg">
                <Icon name="Send" className="mr-2" size={20} />
                Подать заявку
              </Button>
            </CardContent>
          </Card>
        </div>



        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Shield" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="font-semibold mb-2">Гарантированная безопасность</h3>
              <p className="text-gray-600 text-sm">Все документы защищены электронной подписью и шифрованием</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Zap" className="mx-auto mb-4 text-secondary" size={48} />
              <h3 className="font-semibold mb-2">Быстрое оформление</h3>
              <p className="text-gray-600 text-sm">Экспресс-гарантии за 1-3 рабочих дня</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Users" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="font-semibold mb-2">Персональный менеджер</h3>
              <p className="text-gray-600 text-sm">Индивидуальное сопровождение каждой сделки</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Index