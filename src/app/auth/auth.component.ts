import { Component, OnInit, Output, EventEmitter, ContentChild, AfterContentInit, ViewChild, ElementRef, AfterViewInit, Renderer } from '@angular/core';
import { User } from '../app.component';
import { AuthRememberComponent } from '../auth-remember/auth-remember.component';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterContentInit, AfterViewInit {

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();
  showMessage: boolean = false;

  @ContentChild(AuthRememberComponent) remember: AuthRememberComponent;
  @ViewChild('email') email: ElementRef;

  constructor(private renderer: Renderer) { }

  ngOnInit() {
  }

  onSubmit(value: User){
    this.submitted.emit(value);
  }

  ngAfterContentInit() {
    if (this.remember) {
      this.remember.checked.subscribe(val => this.showMessage = val);
    }
  }

  ngAfterViewInit() {
    // this.email.nativeElement.setAttribute('placeholder','Enter your email');
    // this.email.nativeElement.classList.add('yourClassName');
    // this.email.nativeElement.focus();
    // OR USING PLATFORM AGNOSTIC RENDERER
    this.renderer.setElementAttribute(this.email.nativeElement, 'placeholder','Enter your email');
    this.renderer.setElementClass(this.email.nativeElement, 'yourClassName', true);
    this.renderer.invokeElementMethod(this.email.nativeElement, 'focus');
  }
}

