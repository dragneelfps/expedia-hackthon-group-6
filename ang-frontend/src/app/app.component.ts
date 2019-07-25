import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HackathonProject';
    show = true;
    showCal = true;
    box2 = false;
    box4 = false;
    box8 = false;
    box16 = false;
    again = false;
    strikeFlag = true;
    sendMail = false;
  public createMethod() {
    if (!this.again) {
      this.show = !this.show;
      return;
    } else {
      this.show = !this.show;
      this.strikeFlag = !this.strikeFlag;
    }
  }
  public showCall() {
    this.showCal = !this.showCal;
  }
  public editLoc() {
      this.showCal = !this.showCal;
      this.show = !this.show;
      this.box2 = true;
      this.box4 = true;
      this.box8 = true;
      this.box16 = true;
      this.again = true;
  }
  public shareWithFriends() {
    this.sendMail = !this.sendMail;
  }
  public sendEmail() {
    alert('Mail Sent!');
    this.sendMail = !this.sendMail;
  }
  public clearAll() {
    this.showCal = !this.showCal;
    this.show = !this.show;
    this.box2 = false;
    this.box4 = false;
    this.box8 = false;
    this.box16 = false;
    this.again = false;
  }
}
