let answer_num = "";
while(1){
  const random_num = Math.floor(Math.random() * 10);
  const ary = answer_num.split("");
  if(ary.length > 2){
    break;
  }
  let continue_judge = false;
  for(let i in ary){
    if(+ ary[i] == random_num){
      continue_judge = true;
    }
  }
  if(continue_judge){
    continue;
  }
  answer_num += random_num;
}

const ele = new Vue({
  el : "#ele",
  data : {
    button_list : [0,1,2,3,4,5,6,7,8,9],
    display_num : "",
    answer_num,
    judge_result_list : []
  },
  methods : {
    display_num_push : function(e){
      const display_num_ary = this.display_num.split("");
      let judge = true;
      if(display_num_ary.length > 2){ // 文字数が3つより少ないときのみ許可
        judge = false;
      }
      for(let i in display_num_ary){ // 同じ文字が入っているかどうかの判定
        if(display_num_ary[i] == e){
          judge = false;
        }
      }
      if(judge){
        this.display_num += e;
        console.log(e + ":num_button pushed and display add");
      }else{
        console.log(e + ":num_button pushed but deny");
      }
    },
    all_clear : function(){
      this.display_num = "";
      console.log("all_clear pushed");
    },
    judge : function(){
      const answer_num_ary = this.answer_num.split("");
      const display_num_ary = this.display_num.split("");
      const result_object = {
        num : this.display_num,
        eat : 0,
        bite : 0
      };
      for(let answer in answer_num_ary){
        for(let display in display_num_ary){
          if(answer_num_ary[answer] === display_num_ary[display]){
            if(answer == display){
              result_object.eat++;
            }else{
              result_object.bite++;
            }
          }
        }
      }
      this.judge_result_list.push(result_object);
      this.display_num = "";
      console.log(result_object);
    }
  }
})