import { Injectable } from '@angular/core';

export interface Article {
  id: string;
  title: string;
  category: string;
  description: string;
  summary: string;
  tips: string[];
  icon: string;
  accent: string;
}

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private articles: Article[] = [
    {
      id: 'hydration-habits',
      title: 'Why Hydration Matters for Kidney Health',
      category: 'Daily Care',
      description: 'Keep your fluid intake balanced for better kidney health.',
      summary: 'Drinking enough water supports kidney function, especially when you are active or exposed to heat. Water helps the kidneys remove wastes from your blood in the form of urine.',
      tips: [
        'Drink water regularly throughout the day instead of waiting until you feel thirsty.',
        'Use a bottle reminder if you often forget to hydrate.',
        'Reduce sugary drinks and choose water as your main beverage.',
        'Monitor your urine color: it should be pale yellow or clear.'
      ],
      icon: 'water-outline',
      accent: 'secondary'
    },
    {
      id: 'ckd-symptoms',
      title: 'Early Symptoms of Chronic Kidney Disease',
      category: 'Kidney Health',
      description: 'Learn the early warning signs before kidney disease becomes serious.',
      summary: 'Chronic Kidney Disease (CKD) often has no symptoms in its early stages. Detecting signs early can prevent progression to kidney failure.',
      tips: [
        'Watch for fatigue, low energy, or trouble concentrating.',
        'Note changes in urination: more frequent (especially at night) or foamy urine.',
        'Be aware of swelling in your feet, ankles, or hands (edema).',
        'Have your blood pressure checked regularly; high blood pressure damages kidneys.'
      ],
      icon: 'medical-outline',
      accent: 'primary'
    },
    {
      id: 'kidney-foods',
      title: 'Foods That Help Protect Your Kidneys',
      category: 'Healthy Diet',
      description: 'Find out which daily foods can help support kidney function.',
      summary: 'A kidney-friendly diet helps protect your kidneys from further damage. Eating low-sodium, nutrient-dense foods reduces stress on your filtration system.',
      tips: [
        'Incorporate fresh fruits like blueberries, strawberries, and red grapes.',
        'Eat vegetables low in potassium, such as cauliflower, cabbage, and garlic.',
        'Choose lean proteins and limit excessive consumption of red meat.',
        'Reduce processed foods high in sodium and phosphorus food additives.'
      ],
      icon: 'nutrition-outline',
      accent: 'success'
    }
  ];

  constructor() {}

  getArticles(): Article[] {
    return this.articles;
  }

  getArticleById(id: string): Article | undefined {
    return this.articles.find(a => a.id === id);
  }
}
