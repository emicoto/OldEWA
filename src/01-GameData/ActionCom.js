D.COM = {
    洗澡:{
        /*各种行为选项的执行处理 */
        act(t){
            V.record.总泡澡时间 += t; V.record.洗澡 ++;
            TCSV.pc.入浴 = true;
            Source.pc.压力 -= 5; Source.pc.体力 ++;
            Source.pc.清洁 += 2;
        }
    },
    健身:{
        act(t){
            V.record.总健身时间 += t; V.record.健身 ++;
            Source.pc.体力 -= 1.2; Source.pc.清洁 -= 3;
            Source.pc.饮食 -= 4;
        }
    },
    玩游戏:{
        act(t){
            V.record.总游戏时间 += t;
            Source.pc.压力 -= 2; Source.pc.抑郁 -= 1;
            Source.pc.恐惧 -= 1;
        }
    },
    休息:{
        act(t){
            TCSV.pc.休息 = true;
            Source.pc.体力 += 1;
        }
    },
    睡觉:{
        act(t){
            PC.state.睡眠 = true;
            Source.pc.压力 -= 1;
        }
    },
    打扫:{
        act(t){
            PC.exp.清扫 ++
            Source.pc.体力 -= 1
        }
    }
}