package method_drill;

import static org.junit.Assert.*;
import org.junit.Test;

public class Question12Test {

    @Test
    public void test01_20歳以上の場合trueを返却() {
        Person chara = new Person("Deki", 20);
        boolean actual = Question12.isAdult(chara);
        assertTrue(actual);
    }

    @Test
    public void test02_20歳未満の場合falseを返却() {
        Person chara = new Person("Jack", 19);
        boolean actual = Question12.isAdult(chara);
        assertFalse(actual);

    }


}
