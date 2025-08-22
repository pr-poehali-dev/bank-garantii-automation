import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import MarketTicker from '@/components/MarketTicker'
import Icon from '@/components/ui/icon'

const Index = () => {
  const [moscowTime, setMoscowTime] = useState(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' }))
  const [sakhalinTime, setSakhalinTime] = useState(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Asia/Sakhalin' }))
  const [vladivostokTime, setVladivostokTime] = useState(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Asia/Vladivostok' }))
  const [uralTime, setUralTime] = useState(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Asia/Yekaterinburg' }))
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [guaranteeAmount, setGuaranteeAmount] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setMoscowTime(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' }))
      setSakhalinTime(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Asia/Sakhalin' }))
      setVladivostokTime(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Asia/Vladivostok' }))
      setUralTime(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Asia/Yekaterinburg' }))
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
      const file = e.dataTransfer.files[0]
      setUploadedFiles(prev => [...prev, file])
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setUploadedFiles(prev => [...prev, file])
    }
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSelectGuarantee = () => {
    document.getElementById('submit-application')?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendEmailWithAttachments = async () => {
    if (uploadedFiles.length === 0) {
      alert('Пожалуйста, прикрепите документы перед отправкой заявки')
      return
    }

    setIsSubmitting(true)
    
    try {
      const formData = new FormData()
      formData.append('api_key', 'ba42c3d9-0cfe-43b4-816a-cbe491f04fca')
      formData.append('to', 'garantiya25@mail.ru')
      formData.append('subject', 'Новая заявка на банковскую гарантию')
      formData.append('text', `Новая заявка на банковскую гарантию.

Количество прикрепленных документов: ${uploadedFiles.length}`)
      
      uploadedFiles.forEach((file, index) => {
        formData.append(`attachment_${index}`, file)
      })

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        alert('Заявка успешно отправлена!')
        setUploadedFiles([])
      } else {
        throw new Error('Ошибка отправки')
      }
    } catch (error) {
      console.error('Ошибка:', error)
      alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              банковские гарантии <span className="text-blue-600 text-5xl md:text-6xl">.ru</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 animate-fade-in-delay">
              Быстрое оформление банковских гарантий для участия в тендерах и государственных закупках
            </p>
            
            {/* Time Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <div className="text-xs text-slate-500 mb-1">Москва</div>
                <div className="font-mono text-sm font-semibold text-slate-700">{moscowTime}</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <div className="text-xs text-slate-500 mb-1">Урал</div>
                <div className="font-mono text-sm font-semibold text-slate-700">{uralTime}</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <div className="text-xs text-slate-500 mb-1">Владивосток</div>
                <div className="font-mono text-sm font-semibold text-slate-700">{vladivostokTime}</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <div className="text-xs text-slate-500 mb-1">Сахалин</div>
                <div className="font-mono text-sm font-semibold text-slate-700">{sakhalinTime}</div>
              </div>
            </div>
          </div>

          {/* Market Ticker */}
          <MarketTicker />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Step 1: Choose Guarantee Amount */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="CreditCard" className="text-primary" />
                <span>Выберите тип гарантии</span>
              </CardTitle>
              <CardDescription>
                Выберите подходящую сумму банковской гарантии для вашего тендера
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary" onClick={handleSelectGuarantee}>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">до 500К</div>
                    <div className="text-sm text-muted-foreground mb-3">От 2.5% годовых</div>
                    <Badge variant="secondary" className="text-xs">Малый бизнес</Badge>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary" onClick={handleSelectGuarantee}>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">до 2М</div>
                    <div className="text-sm text-muted-foreground mb-3">От 2.2% годовых</div>
                    <Badge variant="secondary" className="text-xs">Средний бизнес</Badge>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary" onClick={handleSelectGuarantee}>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">до 10М</div>
                    <div className="text-sm text-muted-foreground mb-3">От 2.0% годовых</div>
                    <Badge variant="secondary" className="text-xs">Крупный бизнес</Badge>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary" onClick={handleSelectGuarantee}>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">свыше 10М</div>
                    <div className="text-sm text-muted-foreground mb-3">Индивидуально</div>
                    <Badge variant="secondary" className="text-xs">VIP клиенты</Badge>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Details */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="FileText" className="text-primary" />
                <span>Детали заявки</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fz">Федеральный закон</Label>
                  <Input id="fz" placeholder="44-ФЗ, 223-ФЗ и т.д." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Сумма гарантии</Label>
                  <Input 
                    id="amount" 
                    placeholder="1 000 000 руб."
                    value={guaranteeAmount}
                    onChange={(e) => setGuaranteeAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="term">Срок действия</Label>
                  <Input id="term" placeholder="до 31.12.2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tender-link">Ссылка на тендер</Label>
                  <Input id="tender-link" placeholder="https://zakupki.gov.ru/..." />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Requirements */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="FileText" className="text-primary" />
                <span>Перечень документов</span>
              </CardTitle>
              <CardDescription>
                Перечень необходимых документов для ООО:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">1</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-2">Реестровый № торгов/ссылка на закупку</p>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                        <Icon name="Paperclip" size={16} />
                        <span>Прикрепить файл</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">2</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-2">Бух. Бал. по Ф1 и Ф2 за 2024г. (в скане с квитанцией о приеме и о вводе сведений)</p>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                        <Icon name="Paperclip" size={16} />
                        <span>Прикрепить файл</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">3</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-2">Бух. Бал. по Ф1 и Ф2 за 2 кв. 2025г. (промежуточный, в скане с подписью, печатью организации) – только если сможете сформировать</p>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                        <Icon name="Paperclip" size={16} />
                        <span>Прикрепить файл</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">4</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-2">Действующий договор аренды/собственности помещения</p>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                        <Icon name="Paperclip" size={16} />
                        <span>Прикрепить файл</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">5</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-2">Паспорта руководителей и учредителей (все страницы, включая пустые), доля которых равна или свыше 5%</p>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                        <Icon name="Paperclip" size={16} />
                        <span>Прикрепить файл</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">6</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-2">Карточка с реквизитами организации (желательно в word формате)</p>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                        <Icon name="Paperclip" size={16} />
                        <span>Прикрепить файл</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">7</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-2">Устав</p>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                        <Icon name="Paperclip" size={16} />
                        <span>Прикрепить файл</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">8</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-2">Приказ + решение о назначении генерального директора</p>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                        <Icon name="Paperclip" size={16} />
                        <span>Прикрепить файл</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h4 className="font-medium">Загруженные документы:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <div className="flex items-center space-x-2">
                        <Icon name="FileCheck" className="text-green-600" size={16} />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-8 text-center">
                <Button 
                  className="w-full max-w-md mx-auto" 
                  size="lg" 
                  id="submit-application"
                  onClick={sendEmailWithAttachments}
                  disabled={isSubmitting}
                >
                  <Icon name="Send" className="mr-2" size={20} />
                  {isSubmitting ? 'Отправка...' : 'Подать заявку'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Shield" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="font-semibold mb-2">Гарантированная безопасность</h3>
              <p className="text-sm text-muted-foreground">Все операции защищены банковскими стандартами безопасности</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Clock" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="font-semibold mb-2">Быстрое оформление</h3>
              <p className="text-sm text-muted-foreground">Получите банковскую гарантию в кратчайшие сроки</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Users" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="font-semibold mb-2">Персональный менеджер</h3>
              <p className="text-sm text-muted-foreground">Индивидуальное сопровождение на всех этапах</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="mt-12 animate-fade-in">
          <CardHeader>
            <CardTitle>Преимущества банковских гарантий</CardTitle>
            <CardDescription>
              Банковская гарантия — это надежный инструмент для участия в тендерах
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Icon name="CheckCircle" className="mr-2 text-green-600" size={20} />
                  Высокая надежность
                </h4>
                <p className="text-sm text-muted-foreground">Банковская гарантия обеспечивает выполнение обязательств</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Icon name="TrendingUp" className="mr-2 text-blue-600" size={20} />
                  Конкурентное преимущество
                </h4>
                <p className="text-sm text-muted-foreground">Увеличивает шансы на победу в тендере</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Icon name="DollarSign" className="mr-2 text-green-600" size={20} />
                  Экономия средств
                </h4>
                <p className="text-sm text-muted-foreground">Не нужно замораживать собственные средства</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Icon name="FileCheck" className="mr-2 text-blue-600" size={20} />
                  Юридическая защита
                </h4>
                <p className="text-sm text-muted-foreground">Соответствие всем требованиям законодательства</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Index