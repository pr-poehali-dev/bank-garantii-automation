import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Icon from '@/components/ui/icon'
import MarketTicker from '@/components/MarketTicker'
import YandexFormModal from '@/components/YandexFormModal'

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

  const handleDocumentUpload = (file: File) => {
    setUploadedFiles(prev => [...prev, file])
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Market Ticker */}
      <MarketTicker />
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <Icon name="Building2" className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">БАНКОВСКИЕ ГАРАНТИИ.РУ</h1>
                <p className="text-blue-200 text-sm">Официальный партнер банков России</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm font-medium text-blue-100">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <div className="text-right">
                  <div className="text-xs text-gray-500">Москва</div>
                  <div>{moscowTime}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <div className="text-right">
                  <div className="text-xs text-gray-500">Урал</div>
                  <div>{uralTime}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <div className="text-right">
                  <div className="text-xs text-gray-500">Владивосток</div>
                  <div>{vladivostokTime}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <div className="text-right">
                  <div className="text-xs text-gray-500">Сахалин</div>
                  <div>{sakhalinTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-slate-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative text-center space-y-8 animate-fade-in bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-xl">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-slate-600 text-white rounded-full text-sm font-medium">
                <Icon name="Shield" className="mr-2" size={16} />
                Надежно • Быстро • Официально
              </div>
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent leading-tight">
                Автоматизированная система выпуска банковских гарантий
              </h2>
            </div>
            <div className="text-lg text-slate-600 max-w-4xl mx-auto space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl border border-blue-100">
                <p className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
                  Мы официальные партнеры многих банков России!
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
                  <Icon name="Zap" className="text-blue-600 mb-3" size={24} />
                  <p className="font-medium">
                    Сайт создан в целях автоматизации выпуска банковской гарантии, для того чтобы уйти от телефонных переговоров, а сразу же приступить к оформлению банковской гарантии.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
                  <Icon name="Mail" className="text-blue-600 mb-3" size={24} />
                  <p className="font-medium">
                    Все ссылки на подписания будут приходить к вам на почту. В случае дополнительных документов наш менеджер с вами свяжется по почте или в удобном для вас мессенджере.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-step Process */}
        <div className="space-y-8">
          {/* Step 1: Choose Guarantee Amount */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-slate-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">1</div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                  Выберите из списка сумму гарантии
                </h3>
                <p className="text-slate-600">Выберите подходящий тип банковской гарантии</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Commercial Guarantee */}
              <div className="group cursor-pointer" onClick={() => document.getElementById('submit-application')?.scrollIntoView({ behavior: 'smooth' })}>
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
              <div className="group cursor-pointer" onClick={() => document.getElementById('submit-application')?.scrollIntoView({ behavior: 'smooth' })}>
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
              <div className="group cursor-pointer" onClick={() => document.getElementById('submit-application')?.scrollIntoView({ behavior: 'smooth' })}>
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
              <div className="group cursor-pointer" onClick={() => document.getElementById('submit-application')?.scrollIntoView({ behavior: 'smooth' })}>
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
          </div>



          {/* Step 2: Details */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
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
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleDocumentUpload(e.target.files[0])
                            }
                          }}
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
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleDocumentUpload(e.target.files[0])
                            }
                          }}
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
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleDocumentUpload(e.target.files[0])
                            }
                          }}
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
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleDocumentUpload(e.target.files[0])
                            }
                          }}
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
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleDocumentUpload(e.target.files[0])
                            }
                          }}
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
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleDocumentUpload(e.target.files[0])
                            }
                          }}
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
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleDocumentUpload(e.target.files[0])
                            }
                          }}
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
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleDocumentUpload(e.target.files[0])
                            }
                          }}
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
                        onClick={() => {
                          setUploadedFiles(prev => prev.filter((_, i) => i !== index))
                        }}
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