import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.css']
})
export class ShelterComponent {
  shelterId: string;
  shelter = history.state.shelter;

  constructor(private route: ActivatedRoute, private router: Router) {
    if (!this.shelter) {
      this.router.navigate(['/home']);
    }
    console.log('ShelterComponent');
    this.shelterId = <string>this.route.snapshot.paramMap.get('id'); // Recupera o ID do abrigo da rota
    console.log(this.shelterId)
    console.log(this.shelter)
  }

  newItem() {

  }
}
