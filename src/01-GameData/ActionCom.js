D.COM = {
    洗澡:{
        /*各种行为选项的执行处理 */
        act(){
            TCSV.pc.入浴 = true;
            Source.pc.压力 -= 5;
            Source.pc.体力 += 1;
            Source.pc.清洁 += 2;
        }
    },
    健身:{
        act(){
            Source.pc.体力 -= 80;
            Source.pc.清洁 -= 100;
            Source.pc.饮食 -= 120;
        }
    },
    玩游戏:{
        act(){
            Source.pc.压力 -= 100;
            Source.pc.抑郁 -= 100;
            Source.pc.恐惧 -= 100;
        }
    },
    休息:{
        act(){
            TCSV.pc.休息 = true;
            Source.pc.体力 += 1
        }
    },
}