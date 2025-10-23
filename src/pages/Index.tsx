import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DateLocation {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  rating: number;
  reviews: number;
  image: string;
  lat: number;
  lng: number;
}

const dateLocations: DateLocation[] = [
  {
    id: 1,
    name: 'Панорамный ресторан "Седьмое небо"',
    category: 'Рестораны',
    price: 5000,
    description: 'Романтический ужин с видом на город на высоте 85 метров',
    rating: 4.8,
    reviews: 234,
    image: 'https://cdn.poehali.dev/projects/49a4cbcd-1745-4136-95d3-40951c488023/files/4d0b75a3-fe11-4574-b887-6046f4c94fc5.jpg',
    lat: 55.7558,
    lng: 37.6173
  },
  {
    id: 2,
    name: 'Прогулка на теплоходе',
    category: 'Активности',
    price: 3500,
    description: 'Речная прогулка под луной с живой музыкой',
    rating: 4.9,
    reviews: 189,
    image: 'https://cdn.poehali.dev/projects/49a4cbcd-1745-4136-95d3-40951c488023/files/4d0b75a3-fe11-4574-b887-6046f4c94fc5.jpg',
    lat: 55.7522,
    lng: 37.6156
  },
  {
    id: 3,
    name: 'Мастер-класс по живописи',
    category: 'Творчество',
    price: 2500,
    description: 'Создайте совместную картину под руководством художника',
    rating: 4.7,
    reviews: 156,
    image: 'https://cdn.poehali.dev/projects/49a4cbcd-1745-4136-95d3-40951c488023/files/4d0b75a3-fe11-4574-b887-6046f4c94fc5.jpg',
    lat: 55.7489,
    lng: 37.6201
  },
  {
    id: 4,
    name: 'Воздушный шар на рассвете',
    category: 'Приключения',
    price: 8000,
    description: 'Незабываемый полет на воздушном шаре над городом',
    rating: 5.0,
    reviews: 98,
    image: 'https://cdn.poehali.dev/projects/49a4cbcd-1745-4136-95d3-40951c488023/files/4d0b75a3-fe11-4574-b887-6046f4c94fc5.jpg',
    lat: 55.7412,
    lng: 37.6288
  },
  {
    id: 5,
    name: 'Спа-программа для двоих',
    category: 'Релакс',
    price: 6000,
    description: 'Расслабляющая спа-процедура с массажем и ароматерапией',
    rating: 4.9,
    reviews: 267,
    image: 'https://cdn.poehali.dev/projects/49a4cbcd-1745-4136-95d3-40951c488023/files/4d0b75a3-fe11-4574-b887-6046f4c94fc5.jpg',
    lat: 55.7601,
    lng: 37.6089
  },
  {
    id: 6,
    name: 'Приватный кинозал',
    category: 'Развлечения',
    price: 4000,
    description: 'Просмотр любимого фильма в уютном приватном зале',
    rating: 4.6,
    reviews: 143,
    image: 'https://cdn.poehali.dev/projects/49a4cbcd-1745-4136-95d3-40951c488023/files/4d0b75a3-fe11-4574-b887-6046f4c94fc5.jpg',
    lat: 55.7534,
    lng: 37.6234
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Анна и Дмитрий',
    text: 'Забронировали ужин в панорамном ресторане на годовщину. Все было идеально!',
    rating: 5,
    date: '15 октября 2024'
  },
  {
    id: 2,
    name: 'Мария',
    text: 'Воздушный шар - это просто магия! Спасибо за незабываемые впечатления',
    rating: 5,
    date: '8 октября 2024'
  },
  {
    id: 3,
    name: 'Александр',
    text: 'Отличный сервис! Легко забронировать, удобная оплата',
    rating: 4,
    date: '1 октября 2024'
  }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedLocation, setSelectedLocation] = useState<DateLocation | null>(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: ''
  });

  const categories = ['Все', 'Рестораны', 'Активности', 'Творчество', 'Приключения', 'Релакс', 'Развлечения'];

  const filteredLocations = selectedCategory === 'Все' 
    ? dateLocations 
    : dateLocations.filter(loc => loc.category === selectedCategory);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Бронирование успешно оформлено! Мы отправили подтверждение на вашу почту.');
    setSelectedLocation(null);
    setBookingData({ name: '', email: '', phone: '', date: '', time: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Heart" className="text-accent" size={28} />
            <span className="text-2xl font-bold">Romantic Moments</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#map" className="text-sm font-medium hover:text-accent transition-colors">Места</a>
            <a href="#ideas" className="text-sm font-medium hover:text-accent transition-colors">Идеи</a>
            <a href="#reviews" className="text-sm font-medium hover:text-accent transition-colors">Отзывы</a>
            <a href="#contacts" className="text-sm font-medium hover:text-accent transition-colors">Контакты</a>
          </nav>
          <Button className="bg-accent hover:bg-accent/90">
            <Icon name="Phone" size={16} className="mr-2" />
            Позвонить
          </Button>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Создайте незабываемые моменты вместе
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Романтические свидания, которые запомнятся на всю жизнь
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
                <a href="#map">
                  <Icon name="MapPin" size={20} className="mr-2" />
                  Выбрать место
                </a>
              </Button>
              <Button size="lg" variant="outline">
                <Icon name="Sparkles" size={20} className="mr-2" />
                Идеи для свидания
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-10 right-10 text-9xl opacity-5">💕</div>
        <div className="absolute bottom-10 left-10 text-9xl opacity-5">🌹</div>
      </section>

      <section id="map" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Места для свиданий</h2>
            <p className="text-muted-foreground">Выберите идеальное место для вашего романтического вечера</p>
          </div>

          <Tabs defaultValue="Все" className="w-full">
            <TabsList className="w-full justify-start mb-8 flex-wrap h-auto">
              {categories.map(cat => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="data-[state=active]:bg-accent data-[state=active]:text-white"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location) => (
                <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={location.image} 
                      alt={location.name}
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-accent">
                      {location.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <span className="text-lg">{location.name}</span>
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      <span>{location.rating}</span>
                      <span>({location.reviews} отзывов)</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{location.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-accent">{location.price.toLocaleString()} ₽</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            onClick={() => setSelectedLocation(location)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            Забронировать
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>{selectedLocation?.name}</DialogTitle>
                            <DialogDescription>
                              Заполните форму для бронирования. Оплата принимается онлайн.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleBooking} className="space-y-4">
                            <div>
                              <Label htmlFor="name">Ваше имя</Label>
                              <Input 
                                id="name" 
                                required
                                value={bookingData.name}
                                onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                                placeholder="Иван Иванов"
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input 
                                id="email" 
                                type="email"
                                required
                                value={bookingData.email}
                                onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                                placeholder="ivan@example.com"
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone">Телефон</Label>
                              <Input 
                                id="phone" 
                                type="tel"
                                required
                                value={bookingData.phone}
                                onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                                placeholder="+7 (999) 123-45-67"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="date">Дата</Label>
                                <Input 
                                  id="date" 
                                  type="date"
                                  required
                                  value={bookingData.date}
                                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="time">Время</Label>
                                <Input 
                                  id="time" 
                                  type="time"
                                  required
                                  value={bookingData.time}
                                  onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="bg-secondary/50 p-4 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span>Стоимость:</span>
                                <span className="text-xl font-bold text-accent">
                                  {selectedLocation?.price.toLocaleString()} ₽
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                После отправки формы вы будете перенаправлены на страницу оплаты
                              </p>
                            </div>
                            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                              <Icon name="CreditCard" size={18} className="mr-2" />
                              Оплатить и забронировать
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      <section id="ideas" className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Идеи для романтических свиданий</h2>
            <p className="text-muted-foreground">Вдохновение для незабываемых моментов</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: 'Utensils', title: 'Ужин при свечах', desc: 'Романтический вечер в ресторане' },
              { icon: 'Sailboat', title: 'Прогулка на яхте', desc: 'Закат на воде' },
              { icon: 'Music', title: 'Концерт', desc: 'Живая музыка для двоих' },
              { icon: 'Camera', title: 'Фотосессия', desc: 'Сохраните моменты' }
            ].map((idea, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name={idea.icon as any} className="text-accent" size={32} />
                  </div>
                  <CardTitle className="text-xl">{idea.title}</CardTitle>
                  <CardDescription>{idea.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Отзывы наших гостей</h2>
            <p className="text-muted-foreground">Что говорят влюбленные пары</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="text-xs">{testimonial.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-gradient-to-b from-secondary/20 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-muted-foreground mb-8">Мы поможем организовать идеальное свидание</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <Icon name="Phone" className="mx-auto text-accent mb-2" size={32} />
                  <CardTitle className="text-lg">Телефон</CardTitle>
                  <CardDescription>+7 (495) 123-45-67</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Icon name="Mail" className="mx-auto text-accent mb-2" size={32} />
                  <CardTitle className="text-lg">Email</CardTitle>
                  <CardDescription>info@romantic.ru</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Icon name="MapPin" className="mx-auto text-accent mb-2" size={32} />
                  <CardTitle className="text-lg">Адрес</CardTitle>
                  <CardDescription>Москва, ул. Романтиков, 1</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Heart" className="text-accent" size={24} />
            <span className="text-xl font-bold">Romantic Moments</span>
          </div>
          <p className="text-sm opacity-80">© 2024 Romantic Moments. Создаем незабываемые моменты</p>
        </div>
      </footer>
    </div>
  );
}