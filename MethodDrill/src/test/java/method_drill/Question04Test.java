package method_drill;

import static org.junit.Assert.*;
import org.junit.Test;

public class Question04Test {

    @Test
    public void test01_メッセージを取得する() {
        String msg = Question04.getMessage();
        assertEquals(msg, "よろしくおねがいします");
    }

}
