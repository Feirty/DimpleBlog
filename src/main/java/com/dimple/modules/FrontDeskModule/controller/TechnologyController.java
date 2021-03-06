package com.dimple.modules.FrontDeskModule.controller;

import com.dimple.framework.log.annotation.VLog;
import com.dimple.modules.FrontDeskModule.service.IndexService;
import com.dimple.modules.FrontDeskModule.service.TechnologyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @className: TechnologyController
 * @description:
 * @auther: Owenb
 * @date: 01/23/19 17:30
 * @version: 1.0
 */
@Controller
public class TechnologyController {

    @Autowired
    IndexService indexService;

    @Autowired
    TechnologyService technologyService;

    @GetMapping({"/technology.html", "/technology/{page}"})
    @VLog(title = "技术分享")
    public String technologyPage(Model model, @PathVariable(name = "page", required = false) Integer pageNum) {
        Pageable pageable = PageRequest.of((pageNum == null || pageNum < 0) ? 0 : pageNum-1, 10, Sort.Direction.DESC, "createTime");
        model.addAttribute("newestBlog", technologyService.getNewestBlog(pageable));
        return "front/technology";
    }
}
