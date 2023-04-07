package method_drill;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;


/**
 * @author admin0467
 *
 */
public class Question01Test {

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

    /**
     * {@link method_drill.Question1#main(java.lang.String[])} のためのテスト・メソッド。
     */
    @Test
    public void test01_出力されたメッセージの確認() {
        String msg = "おはよう日本";
        Question01.printMessage(msg);
        assertEquals(out.readLine(), "おはよう日本");
    }


}
