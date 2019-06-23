const app = new Vue({
  el : "#element",
  data : {
    answer_num : {
      first_strike : "",
      second_strike : ""
    },
    game_end : false,
    judge_result_list : {
      first_strike : [],
      second_strike : []
    },
    input_area_flag : true,
    first_strike_flag : true,
    button_list : [0,1,2,3,4,5,6,7,8,9],
    display_num : ""
  },
  computed : {
    display_num_lenght_judge : function(){ // display_numの長さの判定
      const display_num_ary = this.display_num.split("");
      return display_num_ary.length == 3 ? true : false;
    },
    display_message_maker : function(){
      return !this.answer_num.first_strike || !this.answer_num.second_strike ? "初期値を設定してください。" : "判定する数字を入力してください。"
    }
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
    judge : function(){
      const answer_num_ary = this.first_strike_flag ? this.answer_num.second_strike.split("") : this.answer_num.second_strike.split("");
      const display_num_ary = this.display_num.split("");
      const result_object = {
        num : this.display_num,
        eat : 0,
        bite : 0
      };
      if(!this.display_num_lenght_judge){
        return "数字の数が3つでないので、判定不能";
      }
      this.input_area_flag = false;
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
      if(this.first_strike_flag){
        this.judge_result_list.second_strike.push(result_object);
      }else{
        this.judge_result_list.first_strike.push(result_object);
      }
      this.display_num = "";
      console.log(result_object);
      if(result_object.eat === answer_num_ary.length){
        this.game_clear();
      }
    },
    game_clear : function(){
      this.game_end = true;
      this.game_end_display_message = this.first_strike_flag ? "先攻" : "後攻";
      this.game_end_display_message += "プレイヤーの勝利です！";
    },
    turn_chenge : function(){
      this.first_strike_flag = !this.first_strike_flag;
      this.input_area_flag = true;
    },
    all_clear : function(){
      this.display_num = "";
      console.log("all_clear pushed");
    },
    setting_num : function(){
      if(!this.display_num_lenght_judge){
        return 0;
      }
      if(this.first_strike_flag){
        this.answer_num.first_strike = this.display_num;
      }else{
        this.answer_num.second_strike = this.display_num;
      }
      this.first_strike_flag = !this.first_strike_flag;
      this.display_num = "";
    }
  }
})