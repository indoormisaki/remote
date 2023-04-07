package method_drill;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class Question11Test {

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
    public void test01_Personの名前を出力() {
        Person chara = new Person("Harry", 28);
        Question11.printMessage(chara);
        assertEquals(out.readLine(), "こんにちはHarryさん");

    }

}
