package method_drill;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class Question02Test {

    private StandardOutputStream out;

    @Before
    public void before() {
        out = new StandardOutputStream();
        System.setOut(out);
    }

    @After
    public void after() {
        System.setOut(null);
    }


    @Test
    public void test01_円の面積が正しく出力される_1() {
        double radius = 4.0;
        double expect = radius * radius * Math.PI;
        String strExpect = String.valueOf(expect);
        Question02.printCircleArea(radius);
        assertEquals(out.readLine(), strExpect);
    }

    @Test
    public void test02_円の面積が正しく出力される_2() {
        double radius = 12.8;
        double expect = radius * radius * Math.PI;
        String strExpect = String.valueOf(expect);
        Question02.printCircleArea(radius);
        assertEquals(out.readLine(), strExpect);
    }

}
