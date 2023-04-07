package method_drill;

import static org.junit.Assert.*;
import org.junit.Test;

public class Question10Test {

    @Test
    public void test01_Point型の原点との距離を計算1() {
        Point p = new Point(2, 3);
        double distance = Question10.getDistanceFromOrigin(p);
        double expect = Math.sqrt(2 * 2 + 3 * 3);
        assertEquals(distance, expect, 0.0);
    }

    @Test
    public void test01_Point型の原点との距離を計算2() {
        Point p = new Point(3, 4);
        double distance = Question10.getDistanceFromOrigin(p);
        double expect = Math.sqrt(3 * 3 + 4 * 4);
        assertEquals(distance, expect, 0.0);
    }

}
