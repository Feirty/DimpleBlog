package com.dimple.service;

import com.dimple.bean.LoginLog;

import java.util.Date;
import java.util.List;

/**
 * @ClassName: LoginLogService
 * @Description: 登录日志的Service类
 * @Auther: Owenb
 * @Date: 11/29/18 18:15
 * @Version: 1.0
 */
public interface LoginLogService {
    /**
     * 插入用户登录的日志
     *
     * @param loginLog 用户登录日志实例
     * @return 受影响的行数
     */
    Integer insertLoginLog(LoginLog loginLog);

    /**
     * 获取符合条件的所有的日志
     *
     * @param address   登录地址
     * @param loginId   登录名称
     * @param status    登录的状态
     * @param startTime 登录的开始时间
     * @param endTime   登录的截止时间
     * @return
     */
    List<LoginLog> getAllLoginLog(String address, String loginId, Boolean status, Date startTime, Date endTime);

    /**
     * 删除所有的登录日志
     *
     * @return
     */
    Integer cleanLoginLog();

    /**
     * 删除指定的ID的登录日志
     *
     * @param ids 日志id
     * @return
     */
    Integer deleteLoginLog(Integer ids[]);
}
