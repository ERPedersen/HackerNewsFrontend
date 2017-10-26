import { Injectable } from '@angular/core';

@Injectable()
export class IconService {

  /**
   * Methods swaps the upvote downvote icons.
   * 
   * @param index 
   * @param node 
   */
  public swapIcon(index, node, type) {
    let upvoteClassName = type + "-meta-upvote";
    let downvoteClassName = type + "-meta-downvote";

    console.log(node);

    let upvoteNode = document.getElementsByClassName(upvoteClassName)[index].children[0];
    let downvoteNode = document.getElementsByClassName(downvoteClassName)[index].children[0];

    if (node.target == upvoteNode) {
      this.swap(upvoteNode, "fa-arrow-up", "fa-minus-square-o");
      if (this.isVoteChecked(downvoteNode)) {
        this.swap(downvoteNode, "fa-minus-square-o", "fa-arrow-down");
      }
    } else {
      this.swap(downvoteNode, "fa-arrow-down", "fa-minus-square-o");
      if (this.isVoteChecked(upvoteNode)) {
        this.swap(upvoteNode, "fa-minus-square-o", "fa-arrow-up");
      }
    }
  }

  private isVoteChecked(node) {
    return node.classList.contains("fa-minus-square-o");
  }

  private swap(node, iconA, iconB) {
    if (node.classList.contains(iconA)) {
      node.classList.remove(iconA);
      node.classList.add(iconB);
    } else {
      node.classList.remove(iconB);
      node.classList.add(iconA);
    }
  }

}
