package method_drill;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class Question03Test {

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
    public void test01_メッセージが0回出力される() {
        String message = "Hello";
        int expectNum = 0;
        int i = 0;
        Question03.printMessage(message, expectNum);
        while (i < expectNum) {
            assertEquals(out.readLine(), message);
            i++;
        }
        assertEquals(out.readLine(), null);
    }

    @Test
    public void test02_メッセージが1回出力される() {
        String message = "Hello";
        int expectNum = 1;
        int i = 0;
        Question03.printMessage(message, expectNum);
        while (i < expectNum) {
            assertEquals(out.readLine(), message);
            i++;
        }
        assertEquals(out.readLine(), null);
    }

    @Test
    public void test03_メッセージが3回出力される() {
        String message = "Hello";
        int expectNum = 3;
        int i = 0;
        Question03.printMessage(message, expectNum);
        while (i < expectNum) {
            assertEquals(out.readLine(), message);
            i++;
        }
        assertEquals(out.readLine(), null);
    }
}
