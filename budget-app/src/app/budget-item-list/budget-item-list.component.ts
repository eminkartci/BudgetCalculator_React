import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BudgetItem } from 'src/shared/models/budget-item.model';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})
export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onDeleteButtonClicked(item: BudgetItem){
    this.delete.emit(item);
  }

  onCardClicked(item: BudgetItem){

    // show pop-up
    const dialgRef =  this.dialog.open(EditItemModalComponent, {
      width: '500px',
      data: item
    });

    dialgRef.afterClosed().subscribe(result =>{
      // check if the result is not null
      if(result){
        // replace the item with new values
        this.budgetItems[this.budgetItems.indexOf(item)] = result;

      }
    })
  }
}
