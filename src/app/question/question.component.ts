import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name: string = '';
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter: number = 60;
  currectQuestion : number = 0;
  inCurrectQuestion : number = 0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted: Boolean = false;

  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe((res)=> {
      this.questionList = res.questions;
    })
  }

  nextQuestion() {
    // this.currentQuestion += 1;
    this.currentQuestion ++;
  }

  previousQuestion() {
    // this.currentQuestion -= 1;
    this.currentQuestion --;
  }

  answer(currectQue: any, option: any) {

    if(currectQue === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    

    if(option.correct) {
      this.points += 10;

      setTimeout(()=> {
        this.currentQuestion ++;
        this.currectQuestion ++;
        this.getProgressPercent();
      }, 1000)
    
    }
    else {
      this.points -= 10;

      setTimeout(()=> {
        this.currentQuestion ++;
        this.inCurrectQuestion --;
      }, 1000)
    }
  }
  
  startCounter() {
    this.interval$ = interval(1000).subscribe(value => {
      this.counter--;
      
      if(this.counter == 0) {
        this.currentQuestion ++;
        this.counter = 60;
        this.points -= 10;
      }
    })

    setTimeout(()=> {
      this.interval$.unsubscribe();
    }, 100000)
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetTheCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetTheCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = '0';
  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion/this.questionList.length) * 100).toString();
    return this.progress
  }
}
