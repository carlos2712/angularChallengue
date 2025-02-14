import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Question {
  question: string;
  codeExample?: string;
  options: string[];
  correctAnswer: number;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  questions: Question[] = [
    {
      question: "What does the following Angular component do?",
      codeExample: `
        import { Component } from '@angular/core';

        @Component({
          selector: 'app-hello',
          template: '<h1>Hello World</h1>',
        })
        export class HelloComponent {}
      `,
      options: [
        "It defines a service.",
        "It defines a component that displays 'Hello World'.",
        "It defines a directive.",
        "It creates a model."
      ],
      correctAnswer: 1
    },
    {
      question: "What is the correct syntax to define a route in Angular?",
      codeExample: `
        import { NgModule } from '@angular/core';
        import { RouterModule, Routes } from '@angular/router';
        import { HomeComponent } from './home/home.component';

        const routes: Routes = [
          { path: '', component: HomeComponent },
        ];

        @NgModule({
          imports: [RouterModule.forRoot(routes)],
          exports: [RouterModule]
        })
        export class AppRoutingModule {}
      `,
      options: [
        "RouterModule.forRoot() is used to set up routing in Angular.",
        "We use the RouterModule.forChild() method to set up routes.",
        "Routes are defined using the Angular component's 'routes' property.",
        "We use AppRoutingModule to manage the application's data model."
      ],
      correctAnswer: 0
    },
    {
      question: "How can you pass data from a parent component to a child component in Angular?",
      codeExample: `
        @Component({
          selector: 'app-parent',
          template: '<app-child [childData]="parentData"></app-child>'
        })
        export class ParentComponent {
          parentData = 'Data from Parent';
        }

        @Component({
          selector: 'app-child',
          template: '<p>{{ childData }}</p>'
        })
        export class ChildComponent {
          @Input() childData: string;
        }
      `,
      options: [
        "By using a service to share data between components.",
        "By using the @Output() decorator to pass data back to the parent.",
        "By using the @Input() decorator to pass data to the child.",
        "By using the ngModel directive for two-way binding."
      ],
      correctAnswer: 2
    },
    {
      question: "What is the purpose of ngOnInit in an Angular component lifecycle?",
      codeExample: `
        import { Component, OnInit } from '@angular/core';

        @Component({
          selector: 'app-my-component',
          template: '<p>{{ message }}</p>'
        })
        export class MyComponent implements OnInit {
          message: string;

          ngOnInit() {
            this.message = 'Component Initialized!';
          }
        }
      `,
      options: [
        "It is called before the component is initialized.",
        "It is used for handling user input.",
        "It is called after the component is initialized and is a good place for initialization logic.",
        "It is used for handling HTTP requests."
      ],
      correctAnswer: 2
    },
    {
      question: "What is an Angular service, and how do you inject it into a component?",
      codeExample: `
        import { Injectable } from '@angular/core';

        @Injectable({
          providedIn: 'root'
        })
        export class MyService {
          getData() {
            return 'Service data';
          }
        }

        @Component({
          selector: 'app-my-component',
          template: '<p>{{ data }}</p>'
        })
        export class MyComponent {
          data: string;

          constructor(private myService: MyService) {
            this.data = this.myService.getData();
          }
        }
      `,
      options: [
        "An Angular service is a utility class that provides reusable logic. It can be injected via the constructor of a component.",
        "An Angular service is a special type of component.",
        "Services cannot be injected into components; they are used exclusively for routing.",
        "Services are injected using the @Input() decorator."
      ],
      correctAnswer: 0
    }
  ];

  currentStep: number = 0;
  selectedAnswer: number | null = null;
  answers: number[] = [];
  isQuizComplete: boolean = false;

  nextQuestion() {
    if (this.selectedAnswer !== null) {
      this.answers.push(this.selectedAnswer);
      this.selectedAnswer = null;
      this.currentStep++;
    }
    if (this.currentStep === this.questions.length) {
      this.isQuizComplete = true;
    }
  }

  prevQuestion() {
    this.currentStep--;
  }

  getResult() {
    const score = this.answers.filter((answer, index) => answer === this.questions[index].correctAnswer).length;
    return `You scored ${score} out of ${this.questions.length}.`;
  }

  restartQuiz() {
    this.currentStep = 0;
    this.selectedAnswer = null;
    this.answers = [];
    this.isQuizComplete = false;
  }
}
