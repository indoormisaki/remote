package method_drill;

import static org.junit.Assert.*;
import org.junit.Test;

public class Question06Test {

    @Test
    public void test01_小さいほうの数値が返却される() {
        double expect = 10.5;
        double unExpect = 15.7;
        double ans = Question06.getMinValue(expect, unExpect);
        assertEquals(expect, ans, 0.0);
    }

}
