package method_drill;

import static org.junit.Assert.*;
import org.junit.Test;

public class Question05Test {

    @Test
    public void test01_偶数の場合trueを返却() {
        int num1 = 10;
        boolean jud1 = Question05.isEvenNumber(num1);
        assertTrue(jud1);

    }

    @Test
    public void test02_奇数の場合falseを返却() {
        int num2 = 7;
        boolean jud2 = Question05.isEvenNumber(num2);
        assertFalse(jud2);

    }

}
